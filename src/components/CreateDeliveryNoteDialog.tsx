import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const CreateDeliveryNoteDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);

  const handleGenerate = () => {
    console.log("Generating delivery note with pairs:", selectedPairs);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Delivery Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Delivery Note</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[1, 2, 3, 4].map((index) => (
            <Select
              key={index}
              value={selectedPairs[index - 1]}
              onValueChange={(value) => {
                const newPairs = [...selectedPairs];
                newPairs[index - 1] = value;
                setSelectedPairs(newPairs);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Pair ID ${index}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="87602">87602</SelectItem>
                <SelectItem value="39486">39486</SelectItem>
                <SelectItem value="67589">67589</SelectItem>
              </SelectContent>
            </Select>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate}>
            Generate Delivery Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeliveryNoteDialog;