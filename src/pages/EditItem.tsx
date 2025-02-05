import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileUp, AlertCircle, CheckCircle, History } from "lucide-react";

const EditItem = () => {
  const { id } = useParams();
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

  // Sample history data
  const historyData = [
    { date: "2024-02-20", action: "Status Change", user: "John Doe", details: "Changed to Grinding" },
    { date: "2024-02-19", action: "Priority Update", user: "Jane Smith", details: "Set to High Priority" },
    { date: "2024-02-18", action: "Comment Added", user: "Mike Johnson", details: "Added inspection notes" },
    { date: "2024-02-17", action: "Process Start", user: "Sarah Williams", details: "Started Disassembly" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        {/* Process steps */}
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

        {/* Main content */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Top section */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-500">Roll ID</div>
              <div className="text-2xl font-bold text-blue-600">{id}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Customer</div>
              <div className="text-xl font-semibold">Samsung</div>
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
                Mark as Done
              </Button>
              <div className="relative inline-block">
                <Button 
                  variant="outline" 
                  className="text-red-600"
                  onClick={() => setShowReportMenu(!showReportMenu)}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>
                {showReportMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {quickReports.map((report) => (
                        <button
                          key={report}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            console.log(`Quick report: ${report}`);
                            setShowReportMenu(false);
                          }}
                        >
                          {report}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-[240px,1fr] gap-6">
            {/* Left sidebar */}
            <div className="space-y-1 border-r border-gray-200 pr-4">
              {[
                { name: "General Information", id: "general" },
                { name: "Disassembly", id: "disassembly" },
                { name: "Grinding", id: "grinding" },
                { name: "Plating", id: "plating" },
                { name: "Heat Treat", id: "heattreat" },
                { name: "Assembly", id: "assembly" },
                { name: "Information", id: "information" },
                { name: "History", id: "history" },
                { name: "Logs", id: "logs" }
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
                  {item.name === "History" && <History className="mr-2 h-4 w-4" />}
                  {item.name}
                </div>
              ))}
            </div>

            {/* Right content */}
            <div className="space-y-6">
              {activeTab === "history" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.action}</TableCell>
                        <TableCell>{record.user}</TableCell>
                        <TableCell>{record.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
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

                  {/* Attached photos */}
                  <div>
                    <Label className="mb-3 block">Attached photos</Label>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>

                  {/* Save button */}
                  <Button className="w-full bg-green-500 hover:bg-green-600">Save</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
