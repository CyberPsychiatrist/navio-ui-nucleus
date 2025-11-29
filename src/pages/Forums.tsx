import { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, Megaphone, ShieldCheck, Calendar, Users, TrendingUp, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Data models
interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  targetAudience: string;
  priority: string;
  estimatedImpact: string;
  tags: string[];
  author: string;
  timestamp: string;
  views: number;
  likes: number;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  campaignType: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  platforms: string[];
  budget: string;
  goals: string;
  kpis: string[];
  keywords: string[];
  author: string;
  timestamp: string;
  views: number;
  participants: number;
}

interface Session {
  id: string;
  title: string;
  description: string;
  sessionType: string;
  topic: string;
  maxParticipants: string;
  duration: string;
  scheduledDate: string;
  scheduledTime: string;
  facilitator: string;
  targetAudience: string;
  expectedOutcomes: string;
  engagementMetrics: string[];
  resources: string[];
  tags: string[];
  author: string;
  timestamp: string;
  views: number;
  registrations: number;
}

// Mock data
const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Personal Safety During Public Transport',
    content: 'Always be aware of your surroundings while using public transport. Keep your belongings secure and visible.',
    category: 'Personal Safety',
    targetAudience: 'Youth (13-17)',
    priority: 'High Impact',
    estimatedImpact: '5000',
    tags: ['safety', 'transport', 'awareness'],
    author: 'Safety NGO Kenya',
    timestamp: '2024-01-15',
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'Online Privacy Protection Tips',
    content: 'Protect your personal information online by using strong passwords and enabling two-factor authentication.',
    category: 'Digital Security',
    targetAudience: 'Young Adults (18-24)',
    priority: 'High Impact',
    estimatedImpact: '7500',
    tags: ['privacy', 'security', 'digital'],
    author: 'Digital Rights Initiative',
    timestamp: '2024-01-14',
    views: 2100,
    likes: 156
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Anti-Bullying Campaign 2024',
    description: 'Working together to create bully-free schools and communities',
    campaignType: 'Awareness Campaign',
    targetAudience: 'Youth (13-17)',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    platforms: ['Social Media', 'School Programs'],
    budget: '50000',
    goals: 'Reduce bullying incidents by 30% in target schools',
    kpis: ['Reach 10,000 students', '500 campaign participants'],
    keywords: ['anti-bullying', 'safety', 'youth'],
    author: 'Youth Empowerment Network',
    timestamp: '2024-01-10',
    views: 3200,
    participants: 450
  },
  {
    id: '2',
    title: 'Digital Safety Awareness Month',
    description: 'Promoting online safety practices across Kenya',
    campaignType: 'Safety Education',
    targetAudience: 'General Public',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    platforms: ['Social Media', 'SMS/Text', 'Community Events'],
    budget: '75000',
    goals: 'Educate 50,000 people about digital safety',
    kpis: ['25,000 social media impressions', '10,000 SMS engagements'],
    keywords: ['digital', 'safety', 'awareness'],
    author: 'TechSafe Kenya',
    timestamp: '2024-01-08',
    views: 2800,
    participants: 680
  }
];

const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Mental Health & Youth Wellness',
    description: 'Expert discussion on mental health challenges faced by youth',
    sessionType: 'Expert Discussion',
    topic: 'Mental Health & Wellness',
    maxParticipants: '50',
    duration: '60 minutes',
    scheduledDate: '2024-02-15',
    scheduledTime: '14:00',
    facilitator: 'Dr. Sarah Johnson',
    targetAudience: 'Young Adults (18-24)',
    expectedOutcomes: 'Increased awareness and coping strategies',
    engagementMetrics: ['Questions asked: 25', 'Participants engaged: 45'],
    resources: ['Mental health guide', 'Coping strategies PDF'],
    tags: ['mental health', 'wellness', 'expert'],
    author: 'Mental Health Foundation',
    timestamp: '2024-01-12',
    views: 1800,
    registrations: 42
  },
  {
    id: '2',
    title: 'Online Safety Q&A for Parents',
    description: 'Live session addressing online safety concerns for parents',
    sessionType: 'Live Q&A Session',
    topic: 'Online Safety',
    maxParticipants: '100',
    duration: '90 minutes',
    scheduledDate: '2024-02-20',
    scheduledTime: '19:00',
    facilitator: 'Tech Safety Expert',
    targetAudience: 'Parents & Guardians',
    expectedOutcomes: 'Practical online safety strategies for families',
    engagementMetrics: ['Questions answered: 40', 'Participants: 85'],
    resources: ['Parent guide to online safety', 'Monitoring tools list'],
    tags: ['online safety', 'parents', 'q&a'],
    author: 'Digital Family Protection',
    timestamp: '2024-01-11',
    views: 2200,
    registrations: 78
  }
];

const ForumsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter and search functionality
  const filteredTips = useMemo(() => {
    return mockTips.filter(tip => {
      const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, mockTips]);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [searchTerm, mockCampaigns]);

  const filteredSessions = useMemo(() => {
    return mockSessions.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || session.topic === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, mockSessions]);

  const categories = useMemo(() => {
    const allCategories = [
      ...new Set([...mockTips.map(tip => tip.category), ...mockSessions.map(session => session.topic)])
    ];
    return ['all', ...allCategories];
  }, [mockTips, mockSessions]);

  const TipCard = ({ tip }: { tip: Tip }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <Badge variant="secondary">{tip.category}</Badge>
          <Badge variant={tip.priority === 'High Impact' ? 'destructive' : 'outline'}>{tip.priority}</Badge>
        </div>
        <div className="text-sm text-gray-500">{tip.timestamp}</div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h3>
      <p className="text-gray-600 mb-4">{tip.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tip.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {tip.views} views
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {tip.likes} likes
          </div>
        </div>
        <span className="text-blue-600 font-medium">{tip.targetAudience}</span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Author:</strong> {tip.author} • <strong>Estimated Impact:</strong> {tip.estimatedImpact} people
        </p>
      </div>
    </div>
  );

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-green-500" />
          <Badge variant="secondary">{campaign.campaignType}</Badge>
        </div>
        <div className="text-sm text-gray-500">{campaign.timestamp}</div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h3>
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Duration</p>
          <p className="text-sm text-gray-600">{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Budget</p>
          <p className="text-sm text-gray-600">KES {campaign.budget}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <p className="text-sm font-medium text-gray-700">Platforms:</p>
        {campaign.platforms.map((platform) => (
          <Badge key={platform} variant="outline" className="text-xs">{platform}</Badge>
        ))}
      </div>
      
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">KPIs:</p>
        <div className="flex flex-wrap gap-2">
          {campaign.kpis.map((kpi) => (
            <Badge key={kpi} variant="secondary" className="text-xs">{kpi}</Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {campaign.views} views
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {campaign.participants} participants
          </div>
        </div>
        <span className="text-green-600 font-medium">{campaign.targetAudience}</span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Author:</strong> {campaign.author}
        </p>
      </div>
    </div>
  );

  const SessionCard = ({ session }: { session: Session }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-500" />
          <Badge variant="secondary">{session.sessionType}</Badge>
        </div>
        <div className="text-sm text-gray-500">{session.timestamp}</div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{session.title}</h3>
      <p className="text-gray-600 mb-4">{session.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Scheduled</p>
          <div className="text-sm text-gray-600">
            <div>{new Date(session.scheduledDate).toLocaleDateString()}</div>
            <div>{session.scheduledTime}</div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Duration</p>
          <p className="text-sm text-gray-600">{session.duration}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Facilitator</p>
          <p className="text-sm text-gray-600">{session.facilitator}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Max Participants</p>
          <p className="text-sm text-gray-600">{session.maxParticipants}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Engagement Metrics:</p>
        <div className="flex flex-wrap gap-2">
          {session.engagementMetrics.map((metric) => (
            <Badge key={metric} variant="outline" className="text-xs">{metric}</Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {session.views} views
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {session.registrations} registered
          </div>
        </div>
        <span className="text-purple-600 font-medium">{session.targetAudience}</span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Author:</strong> {session.author}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Community Forums</h1>
          <p className="text-lg text-gray-600">Discover safety tips, campaigns, and live sessions from our community</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tips, campaigns, and sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tips">Tips</SelectItem>
                  <SelectItem value="campaigns">Campaigns</SelectItem>
                  <SelectItem value="sessions">Sessions</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Safety Tips ({filteredTips.length})
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Campaigns ({filteredCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Sessions ({filteredSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-6">
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => <TipCard key={tip.id} tip={tip} />)
            ) : (
              <div className="text-center py-12">
                <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No safety tips found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)
            ) : (
              <div className="text-center py-12">
                <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No campaigns found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => <SessionCard key={session.id} session={session} />)
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sessions found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ForumsPage;