import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";

const EditItem = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        {/* Header with process steps */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {["Disassembly", "Grinding", "Plating", "Heat Treatment", "Assembly"].map((step, index) => (
            <div
              key={step}
              className={`p-4 border ${
                index === 1 ? "bg-blue-600 text-white" : "bg-white"
              } text-center font-medium rounded-lg`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Top section with border */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-500">Roll ID</div>
              <div className="text-2xl font-bold text-blue-600">{id}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Customer</div>
              <div className="text-xl font-semibold">Samsung</div>
            </div>
            <div className="space-x-4">
              <Button variant="outline">Attach</Button>
              <Button variant="outline" className="text-green-600">Generate Q.R.</Button>
              <Button variant="outline" className="text-red-600">Report</Button>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-[240px,1fr] gap-6">
            {/* Left sidebar with border */}
            <div className="space-y-1 border-r border-gray-200 pr-4">
              {[
                "General Information",
                "Disassembly",
                "Grinding",
                "Plating",
                "Heat Treat",
                "Assembly",
                "Information",
                "Logs"
              ].map((item, index) => (
                <div
                  key={item}
                  className={`p-3 rounded-lg cursor-pointer ${
                    index === 0 
                      ? "bg-gray-100 text-gray-900 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Right content */}
            <div className="space-y-6">
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
                  </div>

                  <div>
                    <Label>Sample data</Label>
                    <Select defaultValue="new1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new1">new value 1</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label>Date of disassembly</Label>
                    <Input type="date" />
                  </div>

                  <div>
                    <Label>Sample data</Label>
                    <Select defaultValue="new1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new1">new value 1</SelectItem>
                      </SelectContent>
                    </Select>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;