'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BusReviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  userName: string;
  userType: 'student' | 'staff';
}

export function BusReviewModal({ isVisible, onClose, userName, userType }: BusReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating",
        variant: "destructive"
      });
      return;
    }

    if (!review.trim()) {
      toast({
        title: "Review Required",
        description: "Please write your review",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create review object
      const reviewData = {
        id: Date.now().toString(),
        rating,
        review: review.trim(),
        userName,
        userType,
        date: new Date().toISOString(),
        approved: false // Reviews need approval before showing on homepage
      };

      // Save to localStorage for now (in real app, this would go to database)
      const existingReviews = JSON.parse(localStorage.getItem('busReviews') || '[]');
      existingReviews.push(reviewData);
      localStorage.setItem('busReviews', JSON.stringify(existingReviews));

      toast({
        title: "Review Submitted!",
        description: "Thanks for your feedback. Review pending approval.",
        variant: "default"
      });

      // Reset form
      setRating(0);
      setReview('');
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isActive = starNumber <= (hoveredRating || rating);

      return (
        <motion.button
          key={starNumber}
          type="button"
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-200 ${
              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </motion.button>
      );
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-bold">Rate Bus Service</h3>
                    <p className="text-blue-100 text-sm">Share your experience</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Rating Stars */}
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">How was your bus experience?</p>
                <div className="flex justify-center gap-2">
                  {renderStars()}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {rating} star{rating !== 1 ? 's' : ''} - {
                      rating === 5 ? 'Excellent!' :
                      rating === 4 ? 'Very Good' :
                      rating === 3 ? 'Good' :
                      rating === 2 ? 'Fair' : 'Needs Improvement'
                    }
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write your review
                </label>
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with the bus service..."
                  className="min-h-[100px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {review.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || rating === 0 || !review.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}