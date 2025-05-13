
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ErrorReportForm {
  rollId: string;
  status: string;
  reason: string;
  comments: string;
  replacementParts: string[];
  attachments: FileList | null;
}

const SAMPLE_PARTS = [
  "Bearing Assembly",
  "End Cover",
  "Thrust Bearing",
  "Clamp Snapring",
  "Sleeve",
  "Key",
  "Barrel Rollers",
  "Inner Race",
  "Outer Race",
  "Housing",
];

const CreateErrorReport = () => {
  const navigate = useNavigate();
  const form = useForm<ErrorReportForm>();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  // Sample placeholder images for demo purposes
  const [placeholderImages] = useState([
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ]);

  const onSubmit = (data: ErrorReportForm) => {
    const formData = {
      ...data,
      replacementParts: selectedParts,
    };
    console.log("Form submitted:", formData);
    navigate("/error-reports");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadClick = () => {
    // Create a hidden file input and trigger it
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*";
    
    fileInput.onchange = (e) => {
      // Fix: properly cast the event to the right type
      const inputEvent = e as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(inputEvent);
    };
    
    fileInput.click();
  };

  const togglePart = (part: string) => {
    setSelectedParts(prev =>
      prev.includes(part)
        ? prev.filter(p => p !== part)
        : [...prev, part]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Error Report
          </h1>
          <p className="text-gray-600">File a new error report</p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rollId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Roll ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="87602">87602</SelectItem>
                        <SelectItem value="87603">87603</SelectItem>
                        <SelectItem value="87604">87604</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="operator_error">Operator Error</SelectItem>
                        <SelectItem value="item_quality">Item Quality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Replacement Parts Used</FormLabel>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SAMPLE_PARTS.map((part) => (
                    <div
                      key={part}
                      onClick={() => togglePart(part)}
                      className={`p-2 border rounded-md cursor-pointer transition-colors ${
                        selectedParts.includes(part)
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {part}
                    </div>
                  ))}
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any comments or additional information..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attachments"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Attachments</FormLabel>
                    <div className="space-y-4">
                      <Button 
                        type="button" 
                        onClick={handleUploadClick}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </Button>
                      
                      {/* Hidden file input for the actual file selection */}
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          handleFileChange(e);
                          onChange(e.target.files);
                        }}
                        className="hidden"
                        {...field}
                      />
                      
                      {/* Display thumbnail grid */}
                      {placeholderImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          {placeholderImages.map((img, index) => (
                            <div key={index} className="space-y-1">
                              <div className="relative aspect-square bg-gray-100 rounded overflow-hidden">
                                <img
                                  src={img}
                                  alt={`Attachment ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                className="w-full text-red-600 hover:underline text-center text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/error-reports")}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Report</Button>
              </div>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default CreateErrorReport;
