'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Clock, Users, Edit, Eye, Archive,
  Plus, Search, Filter,
  DollarSign,
  Compass
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration_minutes: number;
  base_price: number;
  min_participants: number;
  max_participants: number;
  status: 'draft' | 'active' | 'inactive';
  image_url: string;
  total_bookings: number;
  average_rating: number;
}

export default function AdventuresPage() {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadAdventures();
    }
  }, [user]);

  const loadAdventures = async () => {
    try {
      const { data, error } = await supabase
        .from('adventures')
        .select('*')
        .eq('guide_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdventures(data || []);
    } catch (error) {
      console.error('Error loading adventures:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdventureStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('adventures')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setAdventures(adventures.map(adventure => 
        adventure.id === id ? { ...adventure, status: status as any } : adventure
      ));
    } catch (error) {
      console.error('Error updating adventure status:', error);
    }
  };

  const filteredAdventures = adventures
    .filter(adventure => 
      adventure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adventure.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(adventure => 
      statusFilter === 'all' ? true : adventure.status === statusFilter
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Adventures</h1>
        <Link href="/guide/adventures/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Adventure
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search adventures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {statusFilter === 'all' ? 'All Status' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAdventures.map((adventure) => (
          <Card key={adventure.id} className="overflow-hidden">
            <div className="relative h-48">
              {adventure.image_url ? (
                <Image
                  src={adventure.image_url}
                  alt={adventure.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <Badge
                className="absolute top-4 right-4"
                variant={
                  adventure.status === 'active' ? 'default' :
                  adventure.status === 'draft' ? 'secondary' :
                  'destructive'
                }
              >
                {adventure.status}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{adventure.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {adventure.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {Math.floor(adventure.duration_minutes / 60)}h {adventure.duration_minutes % 60}m
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {adventure.min_participants}-{adventure.max_participants} people
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  ${adventure.base_price} per person
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Link href={`/guide/adventures/${adventure.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/adventures/${adventure.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Public
                      </Link>
                      </DropdownMenuItem>
                    {adventure.status === 'draft' && (
                      <DropdownMenuItem
                        onClick={() => updateAdventureStatus(adventure.id, 'active')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Publish
                      </DropdownMenuItem>
                    )}
                    {adventure.status === 'active' && (
                      <DropdownMenuItem
                        onClick={() => updateAdventureStatus(adventure.id, 'inactive')}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    )}
                    {adventure.status === 'inactive' && (
                      <DropdownMenuItem
                        onClick={() => updateAdventureStatus(adventure.id, 'active')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Reactivate
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAdventures.length === 0 && !isLoading && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Compass className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No adventures found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all'
                ? "Try adjusting your search or filters"
                : "Get started by creating your first adventure"}
            </p>
            <Link href="/guide/adventures/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Adventure
              </Button>
            </Link>
          </div>
        )}

        {isLoading && (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
      </div>
    </div>
  );
}