interface ProcessCardProps {
  id: string;
  process: "Disassembly" | "Grinding" | "Plating" | "Heat Treat" | "Assembly";
  client: string;
  pair?: string;
}

const processColors = {
  Disassembly: "bg-neo-process-disassembly",
  Grinding: "bg-neo-process-grinding",
  Plating: "bg-neo-process-plating",
  "Heat Treat": "bg-neo-process-heattreat",
  Assembly: "bg-neo-process-assembly",
};

const ProcessCard = ({ id, process, client, pair }: ProcessCardProps) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
      <div className="text-3xl font-bold mb-2">{id}</div>
      <div className={`${processColors[process]} inline-block px-3 py-1 rounded-md text-black font-medium mb-2`}>
        {process}
      </div>
      {pair && <div className="text-sm mb-1">Pair: {pair}</div>}
      <div className="text-sm">Client: {client}</div>
    </div>
  );
};

export default ProcessCard;