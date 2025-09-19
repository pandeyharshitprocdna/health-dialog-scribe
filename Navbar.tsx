// src/components/Navbar.tsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type NavbarProps = {
  specialties: string[];
  traits: string[];
  selectedSpecialty?: string;
  selectedTrait?: string;
  onChangeSpecialty?: (value: string | undefined) => void;
  onChangeTrait?: (value: string | undefined) => void;
};

const NONE = "none";

const Navbar = ({
  specialties,
  traits,
  selectedSpecialty,
  selectedTrait,
  onChangeSpecialty,
  onChangeTrait,
}: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-sm h-[70px] m-0 px-4">
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co/6RQsLgFL/Proc-DNA-color-1-removebg-preview.png"
          alt="ProcDNA Logo"
          className="h-[48px] w-auto object-contain mix-blend-multiply"
        />
        <h1 className="text-3xl font-bold pl-12 text-blue-900">
          HCP Response Simulator
        </h1>
      </div>

      {/* RIGHT: Filters */}
      <div className="flex items-center gap-8">
        {/* Specialty */}
        <div className="flex flex-row items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Select Specialty:
          </label>
          <Select
            value={selectedSpecialty ?? NONE}
            onValueChange={(v) => onChangeSpecialty?.(v === NONE ? undefined : v)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE}>None</SelectItem>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Persona Traits */}
        <div className="flex flex-row items-center gap-2 pr-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Select Tags / Trait:
          </label>
          <Select
            value={selectedTrait ?? NONE}
            onValueChange={(v) => onChangeTrait?.(v === NONE ? undefined : v)}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select persona trait" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE}>None</SelectItem>
              {traits.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
