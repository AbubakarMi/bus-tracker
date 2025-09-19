'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ClipboardList,
  FileText,
  Calendar,
  Clock,
  Upload,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  Paperclip,
  User,
  Building,
  X
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'expense' | 'travel' | 'incident' | 'feedback';
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  createdDate: string;
  submittedDate?: string;
  approvedDate?: string;
  approver?: string;
  tripId?: string;
  description: string;
  attachments: string[];
  priority: 'low' | 'medium' | 'high';
}

export default function StaffReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Form state
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'travel' as Report['type'],
    description: '',
    priority: 'medium' as Report['priority'],
    tripId: '',
    attachments: [] as string[]
  });

  useEffect(() => {
    // Simulate reports data
    const reportsData: Report[] = [
      {
        id: 'RPT-001',
        title: 'Lagos Conference Travel Report',
        type: 'travel',
        status: 'approved',
        createdDate: '2024-01-16',
        submittedDate: '2024-01-16',
        approvedDate: '2024-01-18',
        approver: 'Dr. Adebayo Samuel',
        tripId: 'TRV-001',
        description: 'Official travel report for attending the Technology Conference in Lagos. Trip was successful with valuable insights gained.',
        attachments: ['conference-certificate.pdf', 'expense-receipts.pdf'],
        priority: 'high'
      },
      {
        id: 'RPT-002',
        title: 'Airport Transfer Expense Report',
        type: 'expense',
        status: 'under-review',
        createdDate: '2024-01-19',
        submittedDate: '2024-01-19',
        tripId: 'TRV-002',
        description: 'Expense report for official airport transfer including taxi fare and meal allowance.',
        attachments: ['taxi-receipt.pdf', 'meal-receipt.pdf'],
        priority: 'medium'
      },
      {
        id: 'RPT-003',
        title: 'Bus Delay Incident Report',
        type: 'incident',
        status: 'submitted',
        createdDate: '2024-01-10',
        submittedDate: '2024-01-11',
        description: 'Report on significant delay experienced during Campus Shuttle service due to mechanical issues.',
        attachments: ['delay-photos.pdf'],
        priority: 'low'
      },
      {
        id: 'RPT-004',
        title: 'Training Workshop Feedback',
        type: 'feedback',
        status: 'draft',
        createdDate: '2024-01-20',
        description: 'Feedback on the effectiveness of the recent staff development training workshop.',
        attachments: [],
        priority: 'low'
      },
      {
        id: 'RPT-005',
        title: 'Monthly Travel Summary',
        type: 'travel',
        status: 'rejected',
        createdDate: '2024-01-05',
        submittedDate: '2024-01-06',
        approvedDate: '2024-01-08',
        approver: 'Prof. Fatima Yusuf',
        description: 'Comprehensive summary of all official travels conducted in December 2023.',
        attachments: ['travel-summary.pdf'],
        priority: 'medium'
      }
    ];

    setReports(reportsData);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'submitted':
        return <Send className="h-4 w-4" />;
      case 'under-review':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'travel':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'expense':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'incident':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'feedback':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCreateReport = () => {
    const report: Report = {
      id: `RPT-${String(reports.length + 1).padStart(3, '0')}`,
      title: newReport.title,
      type: newReport.type,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      description: newReport.description,
      attachments: newReport.attachments,
      priority: newReport.priority,
      tripId: newReport.tripId || undefined
    };

    setReports([report, ...reports]);
    setNewReport({
      title: '',
      type: 'travel',
      description: '',
      priority: 'medium',
      tripId: '',
      attachments: []
    });
    setShowCreateModal(false);
  };

  const downloadReport = (report: Report) => {
    const reportData = `
      ADUSTECH STAFF REPORT
      =====================

      Report ID: ${report.id}
      Title: ${report.title}
      Type: ${report.type.toUpperCase()}
      Status: ${report.status.toUpperCase()}
      Priority: ${report.priority.toUpperCase()}

      Dates:
      Created: ${report.createdDate}
      ${report.submittedDate ? `Submitted: ${report.submittedDate}` : ''}
      ${report.approvedDate ? `Approved: ${report.approvedDate}` : ''}
      ${report.approver ? `Approver: ${report.approver}` : ''}

      ${report.tripId ? `Related Trip: ${report.tripId}` : ''}

      Description:
      ${report.description}

      ${report.attachments.length > 0 ? `Attachments: ${report.attachments.join(', ')}` : ''}

      Generated on: ${new Date().toLocaleDateString()}

      Contact: transport@adustech.edu.ng
      Phone: +234-800-ADUSTECH
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `report-${report.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const stats = {
    total: reports.length,
    draft: reports.filter(r => r.status === 'draft').length,
    submitted: reports.filter(r => r.status === 'submitted').length,
    approved: reports.filter(r => r.status === 'approved').length,
    pending: reports.filter(r => ['submitted', 'under-review'].includes(r.status)).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            Travel Reports
          </h1>
          <p className="text-gray-600 mt-2">Create and manage your official travel reports and documentation</p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Reports</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                <p className="text-sm text-gray-600">Draft</p>
              </div>
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{Math.round((stats.approved / stats.total) * 100) || 0}%</p>
                <p className="text-sm text-gray-600">Approval Rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700">Search Reports</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Report title, ID, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:w-36">
              <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="md:w-36">
              <Label htmlFor="type-filter" className="text-sm font-medium text-gray-700">Type</Label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="travel">Travel</option>
                <option value="expense">Expense</option>
                <option value="incident">Incident</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.id} {report.tripId && `• Trip: ${report.tripId}`}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${getTypeColor(report.type)}`}>
                    {report.type}
                  </Badge>
                  <Badge className={`${getPriorityColor(report.priority)}`}>
                    {report.priority}
                  </Badge>
                  <Badge className={`${getStatusColor(report.status)} flex items-center gap-1`}>
                    {getStatusIcon(report.status)}
                    {report.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created:
                    </span>
                    <span className="font-medium">{report.createdDate}</span>
                  </div>
                  {report.submittedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Submitted:</span>
                      <span className="font-medium">{report.submittedDate}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  {report.approvedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approved:</span>
                      <span className="font-medium">{report.approvedDate}</span>
                    </div>
                  )}
                  {report.approver && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Approver:
                      </span>
                      <span className="font-medium text-right text-xs">{report.approver}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Paperclip className="h-4 w-4" />
                      Attachments:
                    </span>
                    <span className="font-medium">{report.attachments.length}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 line-clamp-2">{report.description}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReport(report)}
                  className="border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadReport(report)}
                  className="border-green-200 hover:border-green-500 hover:bg-green-50"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                {report.status === 'draft' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="h-4 w-4 mr-1" />
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria, or create a new report</p>
          </CardContent>
        </Card>
      )}

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Plus className="h-6 w-6" />
                  Create New Report
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Report Title</Label>
                  <Input
                    id="title"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    placeholder="Enter report title..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">Report Type</Label>
                  <Select value={newReport.type} onValueChange={(value) => setNewReport({ ...newReport, type: value as Report['type'] })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel Report</SelectItem>
                      <SelectItem value="expense">Expense Report</SelectItem>
                      <SelectItem value="incident">Incident Report</SelectItem>
                      <SelectItem value="feedback">Feedback Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</Label>
                  <Select value={newReport.priority} onValueChange={(value) => setNewReport({ ...newReport, priority: value as Report['priority'] })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tripId" className="text-sm font-medium text-gray-700">Related Trip ID (Optional)</Label>
                  <Input
                    id="tripId"
                    value={newReport.tripId}
                    onChange={(e) => setNewReport({ ...newReport, tripId: e.target.value })}
                    placeholder="TRV-001"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  placeholder="Describe the purpose and details of this report..."
                  className="mt-1 resize-none"
                  rows={6}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Attachments</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateReport}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  disabled={!newReport.title || !newReport.description}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedReport.title}</CardTitle>
                  <p className="text-blue-100 mt-1">{selectedReport.id} • {selectedReport.type} Report</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedReport(null)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Status Section */}
              <div className="flex items-center justify-center gap-4">
                <Badge className={`${getStatusColor(selectedReport.status)} text-lg py-2 px-4`}>
                  {getStatusIcon(selectedReport.status)}
                  <span className="ml-2">{selectedReport.status.replace('-', ' ')}</span>
                </Badge>
                <Badge className={`${getTypeColor(selectedReport.type)} text-lg py-2 px-4`}>
                  {selectedReport.type}
                </Badge>
                <Badge className={`${getPriorityColor(selectedReport.priority)} text-lg py-2 px-4`}>
                  {selectedReport.priority} priority
                </Badge>
              </div>

              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Report Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">{selectedReport.createdDate}</span>
                    </div>
                    {selectedReport.submittedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Submitted:</span>
                        <span className="font-medium">{selectedReport.submittedDate}</span>
                      </div>
                    )}
                    {selectedReport.approvedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Approved:</span>
                        <span className="font-medium">{selectedReport.approvedDate}</span>
                      </div>
                    )}
                    {selectedReport.tripId && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Related Trip:</span>
                        <span className="font-medium">{selectedReport.tripId}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Approval Details</h3>
                  <div className="space-y-2 text-sm">
                    {selectedReport.approver ? (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Approver:</span>
                        <span className="font-medium text-right text-xs">{selectedReport.approver}</span>
                      </div>
                    ) : (
                      <p className="text-gray-500">Pending approval</p>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Attachments:</span>
                      <span className="font-medium">{selectedReport.attachments.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">Description</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedReport.description}</p>
                </div>
              </div>

              {/* Attachments */}
              {selectedReport.attachments.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedReport.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{attachment}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-blue-200 hover:border-blue-500 hover:bg-blue-50">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => downloadReport(selectedReport)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                {selectedReport.status === 'draft' && (
                  <Button variant="outline" className="flex-1 border-green-200 hover:border-green-500 hover:bg-green-50">
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}