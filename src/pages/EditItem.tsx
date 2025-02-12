import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileUp, AlertCircle, CheckCircle, History, Link as LinkIcon, Clock, FileText, Info, File, Wrench } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isTopPriority, setIsTopPriority] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const quickReports = [
    "Damaged during process",
    "Missing components",
    "Wrong specifications",
    "Quality issues",
    "Other"
  ];

  const historyData = [
    { 
      jobId: 1001,
      status: "completed",
      deliveryNoteId: "DN-2024-001",
      errorReports: []
    },
    { 
      jobId: 1002,
      status: "failed",
      deliveryNoteId: "DN-2024-002",
      errorReports: ["ERR-001", "ERR-002"]
    },
    { 
      jobId: 1003,
      status: "in_progress",
      deliveryNoteId: "DN-2024-003",
      errorReports: []
    },
  ];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "in_progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "";
    }
  };

  const logEntries = [
    {
      id: "log-001",
      timestamp: "2024-02-21 14:30:22",
      user: "John Smith",
      field: "Top Priority",
      oldValue: "No",
      newValue: "Yes",
      type: "value_change"
    },
    {
      id: "log-002",
      timestamp: "2024-02-21 13:15:45",
      user: "Sarah Connor",
      field: "Assignee",
      oldValue: "Test Operator #2",
      newValue: "Test Operator #1",
      type: "assignment"
    },
    {
      id: "log-003",
      timestamp: "2024-02-21 11:20:33",
      user: "Mike Johnson",
      field: "Due Date",
      oldValue: "2024-03-01",
      newValue: "2024-03-15",
      type: "date_change"
    },
    {
      id: "log-004",
      timestamp: "2024-02-21 10:05:12",
      user: "Emma Davis",
      field: "Status",
      oldValue: "Grinding",
      newValue: "Plating",
      type: "status_change"
    },
    {
      id: "log-005",
      timestamp: "2024-02-21 09:30:00",
      user: "Alex Wilson",
      field: "Problems Found",
      oldValue: "No",
      newValue: "Yes",
      type: "issue_report"
    }
  ];

  const getLogBadgeStyle = (type: string) => {
    switch (type) {
      case "value_change":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "assignment":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "date_change":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "status_change":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "issue_report":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  const mockErrorReports = [
    { 
      id: "ERR-001", 
      date: "2024-03-15",
      status: "open",
      reason: "operator_error",
      reportedBy: "John Smith"
    },
    { 
      id: "ERR-002", 
      date: "2024-03-14",
      status: "resolved",
      reason: "item_quality",
      reportedBy: "Sarah Connor"
    }
  ];

  const getReasonDisplay = (reason: string) => {
    switch (reason) {
      case "operator_error":
        return "Operator Error";
      case "item_quality":
        return "Item Quality";
      default:
        return reason;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        <div className="grid grid-cols-5 gap-4 mb-6">
          {["Disassembly", "Grinding", "Plating", "Heat Treatment", "Assembly"].map((step, index) => (
            <button
              key={step}
              className={`p-3 border ${
                index === 1 ? "bg-blue-600 text-white" : "bg-white"
              } text-center font-medium rounded-lg text-sm flex items-center justify-center h-12`}
            >
              {step}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-500">Roll ID</div>
              <div className="text-2xl font-bold text-blue-600">{id}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Customer</div>
              <div className="text-xl font-semibold">Samsung</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Job ID</div>
              <div className="text-xl font-semibold">JB-1001</div>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                <FileUp className="mr-2 h-4 w-4" />
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files);
                  }}
                />
                Attach Files
              </Button>
              <Button variant="outline" className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600"
                onClick={() => navigate(`/error-reports/new`)}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Report an Issue
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[240px,1fr] gap-6">
            <div className="space-y-1 border-r border-gray-200 pr-4">
              {[
                { name: "General Information", id: "general", icon: Info },
                { name: "Error Reports", id: "error_reports", icon: AlertCircle },
                { name: "Disassembly", id: "disassembly" },
                { name: "Grinding", id: "grinding" },
                { name: "Plating", id: "plating" },
                { name: "Heat Treat", id: "heattreat" },
                { name: "Assembly", id: "assembly" },
                { name: "Information", id: "information", icon: FileText },
                { name: "History", id: "history", icon: History },
                { name: "Logs", id: "logs", icon: File }
              ].map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer flex items-center ${
                    activeTab === item.id 
                      ? "bg-gray-100 text-gray-900 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.name}
                </div>
              ))}
            </div>

            <div className="h-[calc(100vh-280px)] overflow-hidden">
              {activeTab === "error_reports" ? (
                <div className="h-full overflow-y-auto pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockErrorReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusBadgeStyle(report.status)}
                            >
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{getReasonDisplay(report.reason)}</TableCell>
                          <TableCell>{report.reportedBy}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/error-reports/${report.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : activeTab === "logs" ? (
                <div className="h-full overflow-y-auto pr-4">
                  {logEntries.map((entry) => (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Clock className="h-4 w-4" />
                        {entry.timestamp}
                      </div>
                      <p className="text-gray-900">
                        <span className="font-medium">{entry.user}</span> changed{" "}
                        <span className="font-medium">{entry.field}</span> from{" "}
                        <span className="text-gray-500 line-through">{entry.oldValue}</span> to{" "}
                        <span className="text-blue-600">{entry.newValue}</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${getLogBadgeStyle(entry.type)}`}
                        >
                          {entry.type.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Badge>
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === "history" ? (
                <div className="h-full overflow-y-auto pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Delivery Note ID</TableHead>
                        <TableHead>Error Reports</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historyData.map((record) => (
                        <TableRow key={record.jobId}>
                          <TableCell className="font-medium">#{record.jobId}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusBadgeStyle(record.status)}
                            >
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link 
                              to={`/delivery-notes/${record.deliveryNoteId}`}
                              className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <LinkIcon className="h-4 w-4 mr-1" />
                              {record.deliveryNoteId}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {record.errorReports.map((errorId) => (
                                <Link
                                  key={errorId}
                                  to={`/error-reports/${errorId}`}
                                  className="flex items-center text-red-600 hover:text-red-800"
                                >
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {errorId}
                                </Link>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : activeTab === "information" ? (
                <div className="h-full overflow-y-auto pr-4">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Client Instructions</h3>
                      <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                        The client has specified that this roll requires special handling during the plating process. 
                        Ensure that the chromium coating is applied evenly and meets the thickness requirements of 0.3mm ± 0.02mm. 
                        The surface finish must achieve Ra 0.4μm or better. Temperature during plating should not exceed 55°C.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Item Instructions</h3>
                      <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                        This is a high-precision calendar roll used in paper manufacturing. Before disassembly, 
                        mark all components and document their original positions. During reassembly, maintain 
                        precise alignment and follow the torque specifications provided in the technical manual. 
                        Special attention should be paid to the bearing housings and sealing surfaces.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Related Documents</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: "Technical Specifications.pdf", size: "2.4 MB" },
                          { name: "Quality Requirements.pdf", size: "1.8 MB" },
                          { name: "Assembly Instructions.pdf", size: "3.1 MB" },
                          { name: "Safety Guidelines.pdf", size: "1.2 MB" }
                        ].map((doc) => (
                          <div 
                            key={doc.name}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          >
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === "disassembly" ? (
                <div className="h-full overflow-y-auto pr-4 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        { id: "end_cover", label: "End Cover", hint: "Enter the end cover specifications and condition" },
                        { id: "bender_frame", label: "Bender Frame", hint: "Document the bender frame details" },
                        { id: "thrust_bearing_os", label: "Thrust Bearing OS", hint: "Operating side thrust bearing details" },
                        { id: "thrust_bearing_ds", label: "Thrust Bearing DS", hint: "Drive side thrust bearing details" },
                        { id: "clamp_snapring_os", label: "Clamp Snapring OS", hint: "Operating side snapring specifications" },
                        { id: "sleeve_os", label: "Sleeve OS", hint: "Operating side sleeve measurements" },
                        { id: "key_os", label: "Key OS", hint: "Operating side key dimensions" },
                        { id: "barrel_rollers_os", label: "Barrel Rollers OS", hint: "Operating side roller conditions" },
                        { id: "inner_race_1", label: "Inner Race 1", hint: "First inner race specifications" },
                        { id: "inner_race_2", label: "Inner Race 2", hint: "Second inner_race specifications" },
                        { id: "outer_race_1", label: "Outer Race 1", hint: "First outer race specifications" }
                      ].map((field) => (
                        <div key={field.id} className="space-y-1">
                          <Label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </Label>
                          <Input
                            id={field.id}
                            className="w-full"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                          <p className="text-sm text-gray-500">{field.hint}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[
                        { id: "outer_race_2", label: "Outer Race 2", hint: "Second outer race specifications" },
                        { id: "housing_os", label: "Housing OS", hint: "Operating side housing condition" },
                        { id: "clamp_snapring_ds", label: "Clamp Snapring DS", hint: "Drive side snapring specifications" },
                        { id: "sleeve_ds", label: "Sleeve DS", hint: "Drive side sleeve measurements" },
                        { id: "key_ds", label: "Key DS", hint: "Drive side key dimensions" },
                        { id: "barrel_rollers_ds", label: "Barrel Rollers DS", hint: "Drive side roller conditions" },
                        { id: "inner_race_3", label: "Inner Race 3", hint: "Third inner race specifications" },
                        { id: "inner_race_4", label: "Inner Race 4", hint: "Fourth inner race specifications" },
                        { id: "outer_race_3", label: "Outer Race 3", hint: "Third outer race specifications" },
                        { id: "outer_race_4", label: "Outer Race 4", hint: "Fourth outer race specifications" },
                        { id: "housing_ds", label: "Housing DS", hint: "Drive side housing condition" }
                      ].map((field) => (
                        <div key={field.id} className="space-y-1">
                          <Label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </Label>
                          <Input
                            id={field.id}
                            className="w-full"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                          <p className="text-sm text-gray-500">{field.hint}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="date_of_disassembly" className="block text-sm font-medium text-gray-700">
                        Date of Disassembly
                      </Label>
                      <Input
                        id="date_of_disassembly"
                        type="datetime-local"
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">Select the date and time when disassembly was performed</p>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="disassembly_operators" className="block text-sm font-medium text-gray-700">
                        Disassembly Operators
                      </Label>
                      <Input
                        id="disassembly_operators"
                        className="w-full"
                        placeholder="Enter operator names"
                      />
                      <p className="text-sm text-gray-500">Enter the names of operators who performed the disassembly</p>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="replaced_parts" className="block text-sm font-medium text-gray-700">
                        Replaced Parts
                      </Label>
                      <Input
                        id="replaced_parts"
                        className="w-full"
                        placeholder="Enter replaced parts"
                      />
                      <p className="text-sm text-gray-500">List any parts that were replaced during disassembly</p>
                    </div>

                    <div className="space-y-1">
                      <Label className="block text-sm font-medium text-gray-700">
                        Replacement Required
                      </Label>
                      <Switch />
                      <p className="text-sm text-gray-500">Indicate if replacement is needed (Yes/No)</p>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">Save Disassembly Information</Button>
                </div>
              ) : (
                <div className="h-full overflow-y-auto pr-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Pair ID</Label>
                        <Select defaultValue="87602">
                          <SelectTrigger>
                            <SelectValue placeholder="Select pair ID" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="87602">87602</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Problems found</Label>
                          <div className="mt-2">
                            <Switch />
                          </div>
                        </div>
                        <div>
                          <Label>Waiting in line</Label>
                          <div className="mt-2">
                            <Switch />
                          </div>
                        </div>
                        <div>
                          <Label>Top Priority</Label>
                          <div className="mt-2">
                            <Switch
                              checked={isTopPriority}
                              onCheckedChange={setIsTopPriority}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Assignee</Label>
                        <Select defaultValue="operator1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operator1">Test Operator #1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Due date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <Label className="mb-3 block">Attached photos</Label>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">Save</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
