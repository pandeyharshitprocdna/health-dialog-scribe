// src/components/ChatNavbar.tsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type ChatNavbarProps = {
  professionals: string[];
  products: string[];
  selectedProfessional?: string;
  selectedProduct?: string;
  onChangeProfessional?: (value: string | undefined) => void;
  onChangeProduct?: (value: string | undefined) => void;
  title?: string; // optional override
};

const NONE = "none";

const ChatNavbar = ({
  professionals,
  products,
  selectedProfessional,
  selectedProduct,
  onChangeProfessional,
  onChangeProduct,
  title = "HCP Chat Assistant",
}: ChatNavbarProps) => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-sm h-[70px] m-0 px-4">
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-4">
        <img
          src="../static/proclogo.png"
          alt="ProcDNA Logo"
          className="h-[48px] w-auto object-contain mix-blend-multiply"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 pl-6">
          {title}
        </h1>
      </div>

      {/* RIGHT: Filters */}
      <div className="flex items-center gap-8">
        {/* Healthcare Professional */}
        <div className="flex flex-row items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Select Healthcare Professional:
          </label>
          <Select
            value={selectedProfessional ?? NONE}
            onValueChange={(v) => onChangeProfessional?.(v === NONE ? undefined : v)}
          >
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Choose HCP persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE}>None</SelectItem>
              {professionals.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product */}
        <div className="flex flex-row items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Select Product:
          </label>
          <Select
            value={selectedProduct ?? NONE}
            onValueChange={(v) => onChangeProduct?.(v === NONE ? undefined : v)}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Choose product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE}>None</SelectItem>
              {products.map((prod) => (
                <SelectItem key={prod} value={prod}>
                  {prod}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default ChatNavbar;
