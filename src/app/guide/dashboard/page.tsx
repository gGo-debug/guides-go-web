'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, Users, DollarSign, Star, 
  TrendingUp, ArrowRight, Clock 
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  activeAdventures: number;
  upcomingBookings: number;
}

interface RecentBooking {
  id: string;
  booking_date: string;
  start_time: string;
  total_price: number;
  status: string;
  adventure: {
    title: string;
  };
}

export default function GuideDashboard() {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const { data: statsData } = await supabase
        .rpc('get_guide_stats', { guide_uuid: user?.id });

      if (statsData) {
        setStats(statsData[0]);
      }

      // Load recent bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          start_time,
          total_price,
          status,
          adventure:adventures(title)
        `)
        .eq('guide_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (bookingsData) {
        setRecentBookings(bookingsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/guide/adventures/new">
          <Button>
            Create New Adventure
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Adventures</p>
                  <p className="text-2xl font-bold">{stats?.activeAdventures || 0}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats?.totalBookings || 0}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Star className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{stats?.averageRating?.toFixed(1) || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{booking.adventure.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</span>
                    <Clock className="h-4 w-4 ml-4 mr-1" />
                    <span>
                      {format(new Date(`2000-01-01T${booking.start_time}`), 'h:mm a')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${booking.total_price}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {booking.status}
                    </p>
                  </div>
                  <Link href={`/guide/bookings/${booking.id}`}>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}