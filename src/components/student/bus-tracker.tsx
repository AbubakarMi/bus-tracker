
'use client';

import * as React from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { predictRealTimeETA, type RealTimeETAPredictionOutput } from '@/ai/flows/real-time-eta-prediction';
import { useMockBusLocation } from '@/lib/hooks/use-mock-bus-location';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Clock, Zap, FileText } from 'lucide-react';
import { Separator } from '../ui/separator';

const etaFormSchema = z.object({
  stopLatitude: z.coerce.number().min(-90).max(90),
  stopLongitude: z.coerce.number().min(-180).max(180),
});

function MapUpdater({ position }: { position: { lat: number; lng: number } }) {
    const map = useMap();
    React.useEffect(() => {
        if (map && position) {
            map.panTo(position);
        }
    }, [map, position]);
    return null;
}

export function BusTracker() {
  const busPosition = useMockBusLocation({ lat: 34.0522, lng: -118.2437 });
  const [etaResult, setEtaResult] = React.useState<RealTimeETAPredictionOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof etaFormSchema>>({
    resolver: zodResolver(etaFormSchema),
    defaultValues: {
      stopLatitude: 34.06,
      stopLongitude: -118.25,
    },
  });

  async function onSubmit(values: z.infer<typeof etaFormSchema>) {
    setIsLoading(true);
    setEtaResult(null);
    try {
      const result = await predictRealTimeETA({
        busLocation: {
          latitude: busPosition.lat,
          longitude: busPosition.lng,
          timestamp: Date.now(),
        },
        studentStop: {
          latitude: values.stopLatitude,
          longitude: values.stopLongitude,
        },
        routeData: 'Route 51, distance to stop: 2.5km, 3 stops remaining.',
        historicalTrafficData: 'Moderate traffic expected on this route at this time of day.',
      });
      setEtaResult(result);
    } catch (error) {
      console.error('Error predicting ETA:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to predict ETA. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Map</CardTitle>
            <CardDescription>Bus location updates in real-time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full overflow-hidden rounded-md border">
              <Map
                defaultCenter={busPosition}
                defaultZoom={13}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId="bus_tracker_map"
              >
                <AdvancedMarker position={busPosition} title="Your Bus" />
                <MapUpdater position={busPosition} />
              </Map>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>ETA Prediction</CardTitle>
            <CardDescription>Get an AI-powered ETA to your stop.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="stopLatitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stop Latitude</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.0001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stopLongitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stop Longitude</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.0001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Predict ETA
                </Button>
              </form>
            </Form>
            
            {(isLoading || etaResult) && <Separator className="my-6" />}

            {isLoading && (
              <div className="text-center text-muted-foreground">
                <p>Generating prediction...</p>
              </div>
            )}
            {etaResult && (
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Estimated Arrival Time</p>
                    <p className="text-muted-foreground">{new Date(etaResult.estimatedArrivalTime).toLocaleTimeString()}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Confidence</p>
                    <p className="text-muted-foreground">{(etaResult.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Analysis</p>
                    <p className="text-muted-foreground">{etaResult.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
