'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Search,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'system' | 'user' | 'booking' | 'driver' | 'admin' | 'security';
  severity: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  ip?: string;
  metadata?: Record<string, any>;
}

interface SystemAlert {
  id: string;
  timestamp: string;
  type: 'maintenance' | 'performance' | 'security' | 'capacity' | 'driver';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'active' | 'resolved' | 'acknowledged';
  assignedTo?: string;
  resolvedAt?: string;
  busId?: string;
  driverId?: string;
}

export default function ActivityMonitoring() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      timestamp: '2024-03-15 14:30:25',
      type: 'user',
      severity: 'info',
      title: 'User Login',
      description: 'Ahmed Hassan logged into the system',
      userId: '1',
      userName: 'Ahmed Hassan',
      userRole: 'student',
      ip: '192.168.1.101'
    },
    {
      id: '2',
      timestamp: '2024-03-15 14:28:15',
      type: 'booking',
      severity: 'success',
      title: 'Booking Confirmed',
      description: 'Seat 12A booked for ADUS-001 (Campus to City Center)',
      userId: '1',
      userName: 'Ahmed Hassan',
      userRole: 'student',
      metadata: { busNumber: 'ADUS-001', seatNumber: '12A', amount: 155 }
    },
    {
      id: '3',
      timestamp: '2024-03-15 14:25:10',
      type: 'driver',
      severity: 'warning',
      title: 'Driver Late',
      description: 'Ahmed Musa is 15 minutes behind schedule',
      userId: 'driver-1',
      userName: 'Ahmed Musa',
      userRole: 'driver',
      metadata: { busNumber: 'ADUS-001', delayMinutes: 15 }
    },
    {
      id: '4',
      timestamp: '2024-03-15 14:20:00',
      type: 'system',
      severity: 'error',
      title: 'Bus Communication Lost',
      description: 'Lost GPS signal from ADUS-003',
      metadata: { busNumber: 'ADUS-003', lastKnownLocation: '11.0648, 7.7389' }
    },
    {
      id: '5',
      timestamp: '2024-03-15 14:15:45',
      type: 'admin',
      severity: 'info',
      title: 'Route Updated',
      description: 'Campus to City Center route schedule modified',
      userId: 'admin-1',
      userName: 'Admin User',
      userRole: 'admin',
      metadata: { routeId: '1', changes: ['departure time updated'] }
    },
    {
      id: '6',
      timestamp: '2024-03-15 14:10:30',
      type: 'security',
      severity: 'warning',
      title: 'Multiple Login Attempts',
      description: 'Failed login attempts detected from IP 192.168.1.200',
      ip: '192.168.1.200',
      metadata: { attempts: 5, timeWindow: '5 minutes' }
    },
    {
      id: '7',
      timestamp: '2024-03-15 14:05:20',
      type: 'booking',
      severity: 'error',
      title: 'Payment Failed',
      description: 'Payment processing failed for booking attempt',
      userId: '2',
      userName: 'Fatima Aliyu',
      userRole: 'student',
      metadata: { amount: 98, reason: 'insufficient funds' }
    },
    {
      id: '8',
      timestamp: '2024-03-15 14:00:15',
      type: 'system',
      severity: 'success',
      title: 'Bus Departed',
      description: 'ADUS-002 departed from Campus to Hotoro',
      metadata: { busNumber: 'ADUS-002', route: 'Campus to Hotoro', passengers: 22 }
    }
  ]);

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      timestamp: '2024-03-15 14:30:00',
      type: 'maintenance',
      severity: 'high',
      title: 'Bus ADUS-003 Breakdown',
      description: 'Engine malfunction reported, immediate maintenance required',
      status: 'active',
      busId: 'ADUS-003',
      assignedTo: 'Maintenance Team A'
    },
    {
      id: '2',
      timestamp: '2024-03-15 14:25:00',
      type: 'driver',
      severity: 'medium',
      title: 'Driver Schedule Delay',
      description: 'Ahmed Musa is running 15 minutes behind schedule',
      status: 'acknowledged',
      driverId: 'driver-1',
      assignedTo: 'Operations Manager'
    },
    {
      id: '3',
      timestamp: '2024-03-15 14:20:00',
      type: 'capacity',
      severity: 'medium',
      title: 'High Demand Route',
      description: 'City Center route at 95% capacity, consider additional bus',
      status: 'active',
      assignedTo: 'Route Manager'
    },
    {
      id: '4',
      timestamp: '2024-03-15 14:15:00',
      type: 'security',
      severity: 'high',
      title: 'Suspicious Login Activity',
      description: 'Multiple failed login attempts from external IP',
      status: 'resolved',
      resolvedAt: '2024-03-15 14:18:00',
      assignedTo: 'Security Team'
    },
    {
      id: '5',
      timestamp: '2024-03-15 14:10:00',
      type: 'performance',
      severity: 'low',
      title: 'Slow Response Times',
      description: 'API response times above normal threshold',
      status: 'active',
      assignedTo: 'Tech Team'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [alertStatusFilter, setAlertStatusFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const filteredAlerts = systemAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = alertStatusFilter === 'all' || alert.status === alertStatusFilter;

    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add a new activity log
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'system',
      severity: 'info',
      title: 'Data Refreshed',
      description: 'Activity monitoring data updated',
      metadata: { refreshedAt: new Date().toISOString() }
    };

    setActivityLogs(prev => [newLog, ...prev]);
    setIsRefreshing(false);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'warning':
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
      case 'high':
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'critical':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user':
        return '👤';
      case 'booking':
        return '🎫';
      case 'driver':
        return '🚗';
      case 'admin':
        return '⚙️';
      case 'security':
        return '🔒';
      case 'system':
        return '💻';
      case 'maintenance':
        return '🔧';
      case 'performance':
        return '📊';
      case 'capacity':
        return '📈';
      default:
        return '📝';
    }
  };

  const getActivityStats = () => {
    const total = activityLogs.length;
    const errors = activityLogs.filter(log => log.severity === 'error').length;
    const warnings = activityLogs.filter(log => log.severity === 'warning').length;
    const success = activityLogs.filter(log => log.severity === 'success').length;

    return { total, errors, warnings, success };
  };

  const getAlertStats = () => {
    const total = systemAlerts.length;
    const active = systemAlerts.filter(alert => alert.status === 'active').length;
    const critical = systemAlerts.filter(alert => alert.severity === 'critical').length;
    const resolved = systemAlerts.filter(alert => alert.status === 'resolved').length;

    return { total, active, critical, resolved };
  };

  const activityStats = getActivityStats();
  const alertStats = getAlertStats();

  const handleResolveAlert = (alertId: string) => {
    setSystemAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) }
          : alert
      )
    );
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setSystemAlerts(alerts =>
      alerts.map(alert =>
        alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor system activities and alerts in real-time</p>
        </div>
        <Button
          onClick={refreshData}
          disabled={isRefreshing}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertStats.active}</div>
            <p className="text-xs text-muted-foreground">
              {alertStats.critical} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activityStats.errors}</div>
            <p className="text-xs text-muted-foreground">
              {activityStats.warnings} warnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((activityStats.success / activityStats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {activityStats.success} successful operations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Activity Logs and System Alerts */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
        </TabsList>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getTypeIcon(log.type)}</span>
                          <Badge variant="outline">{log.type}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(log.severity)}
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.title}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{log.description}</p>
                      </TableCell>
                      <TableCell>
                        {log.userName && (
                          <div>
                            <p className="font-medium text-sm">{log.userName}</p>
                            <Badge variant="outline" className="text-xs">
                              {log.userRole}
                            </Badge>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {log.metadata && (
                          <div className="text-xs text-gray-500">
                            {Object.entries(log.metadata).slice(0, 2).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          {/* Alert Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="capacity">Capacity</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={alertStatusFilter} onValueChange={setAlertStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Alert</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-mono text-sm">
                        {alert.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getTypeIcon(alert.type)}</span>
                          <Badge variant="outline">{alert.type}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(alert.severity)}
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {alert.title}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{alert.description}</p>
                      </TableCell>
                      <TableCell>
                        {alert.assignedTo && (
                          <Badge variant="outline">{alert.assignedTo}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                        {alert.resolvedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Resolved: {alert.resolvedAt}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {alert.status === 'active' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAcknowledgeAlert(alert.id)}
                              >
                                Acknowledge
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleResolveAlert(alert.id)}
                              >
                                Resolve
                              </Button>
                            </>
                          )}
                          {alert.status === 'acknowledged' && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}