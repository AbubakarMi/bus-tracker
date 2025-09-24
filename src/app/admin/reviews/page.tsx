'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  CheckCircle,
  XCircle,
  MessageSquare,
  User,
  Calendar,
  Shield
} from 'lucide-react';

interface StoredReview {
  id: string;
  rating: number;
  review: string;
  userName: string;
  userType: 'student' | 'staff';
  date: string;
  approved: boolean;
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<StoredReview[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReviews = localStorage.getItem('busReviews');
      if (storedReviews) {
        try {
          const parsedReviews: StoredReview[] = JSON.parse(storedReviews);
          setReviews(parsedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (error) {
          console.error('Error loading reviews:', error);
        }
      }
    }
  }, []);

  // Update review approval status
  const updateReviewApproval = (reviewId: string, approved: boolean) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, approved } : review
    );

    setReviews(updatedReviews);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('busReviews', JSON.stringify(updatedReviews));
    }
  };

  // Delete review
  const deleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('busReviews', JSON.stringify(updatedReviews));
    }
  };

  const pendingReviews = reviews.filter(r => !r.approved);
  const approvedReviews = reviews.filter(r => r.approved);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          <p className="text-muted-foreground">Manage student and staff bus service reviews</p>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingReviews.length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{approvedReviews.length}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Pending Reviews ({pendingReviews.length})
          </CardTitle>
          <CardDescription>
            Reviews waiting for approval to be displayed on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingReviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pending reviews</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold">{review.userName}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant={review.userType === 'student' ? 'default' : 'secondary'}>
                            {review.userType}
                          </Badge>
                          <Calendar className="h-4 w-4" />
                          {formatDate(review.date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "{review.review}"
                  </blockquote>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateReviewApproval(review.id, true)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => deleteReview(review.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Approved Reviews ({approvedReviews.length})
          </CardTitle>
          <CardDescription>
            Reviews currently displayed on the homepage testimonials section
          </CardDescription>
        </CardHeader>
        <CardContent>
          {approvedReviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No approved reviews yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-3 bg-green-50 border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{review.userName}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {review.userType}
                          </Badge>
                          {formatDate(review.date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <blockquote className="text-sm text-gray-700">
                    "{review.review}"
                  </blockquote>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => updateReviewApproval(review.id, false)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Unapprove
                    </Button>
                    <Button
                      onClick={() => deleteReview(review.id)}
                      size="sm"
                      variant="destructive"
                      className="text-xs"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}