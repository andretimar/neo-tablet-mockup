import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useState } from "react";

const formSchema = z.object({
  rollId: z.string().min(1, "Roll ID is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  cause: z.string().min(1, "Cause is required"),
});

const CreateErrorReport = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollId: "",
      date: new Date().toISOString().split('T')[0],
      status: "",
      cause: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values, selectedFiles);
    // Handle form submission
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container max-w-2xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Error Report</h1>
          <p className="text-gray-600">File a new error report</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rollId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll ID</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Roll ID" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6547">Roll #6547</SelectItem>
                      <SelectItem value="6545">Roll #6545</SelectItem>
                      <SelectItem value="6544">Roll #6544</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="major">Major Error</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cause"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cause</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Attachments</FormLabel>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full">Create Report</Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CreateErrorReport;