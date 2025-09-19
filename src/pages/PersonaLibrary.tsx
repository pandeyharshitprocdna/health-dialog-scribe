import { useNavigate } from "react-router-dom";
import { useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Stethoscope,
  Brain,
  Heart,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar"; // ✅ corrected import

interface Persona {
  id: string;
  name: string;
  role: string;
  experience: string;
  traits: string[];
  icon: React.ComponentType<any>;
  description: string;
}

const specialties = ["Oncologist", "Dermatologist", "Cardiologist"];
const personaTraits = ["Evidence-driven", "Brand loyalist", "Guidelines-focused", "Humorous"];

const personas: Persona[] = [
  {
    id: "innovator",
    name: "Dr. Sarah Chen",
    role: "Cardiologist",
    experience: "14 yrs",
    traits: ["Cautious", "Evidence-driven switcher", "Brand Loyalist", "Sticks to few key things", "Warm and Approachable"],
    icon: Brain,
    description: "Cautious oncologist, loyal to evidence and brands, approachable with focused care.",
  },
  {
    id: "loyalist",
    name: "Dr. Michael Torres",
    role: "Dermatologist",
    experience: "10 yrs",
    traits: ["Brand loyalist", "Moderately evidence-aware", "Elaborate and Detailed", "Flexible in adapting new therapy areas", "Early Adopter", "Frequent Switcher"],
    icon: Stethoscope,
    description: "Brand-loyal dermatologist, detailed yet flexible, adapts early and switches frequently.",
  },
  {
    id: "guide",
    name: "Dr. Emma Rodriguez",
    role: "Oncologist",
    experience: "24 yrs",
    traits: ["Humorous", "Data-driven", "Reactive", "Referencing guidelines", "Engaging", "Diverse range of topics"],
    icon: Heart,
    description: "Engaging oncologist, humorous and reactive, blending data with diverse guideline-based care."
  },
];

const chipClass =
  "text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full ring-1 ring-green-200";

const PersonaCard = ({ persona, onSelect }: { persona: Persona; onSelect: (id: string) => void }) => {
  const Icon = persona.icon;

  return (
    <div className="group">
      {/* gradient frame */}
      <div className="relative rounded-3xl p-[1.2px] bg-gradient-to-br from-blue-400/60 via-blue-300/40 to-cyan-200/60 shadow-[0_1px_0_#ffffff33_inset,0_0_0_1px_#ffffff1a_inset]">
        {/* card surface */}
        <Card className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white via-blue-50 to-blue-70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-[500px] flex flex-col">
          <div className="p-6 flex flex-col h-full">
            {/* avatar / icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg ring-2 ring-white/40">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="absolute -inset-1 -z-10 rounded-3xl blur-lg opacity-30 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:opacity-60 transition" />
              </div>
            </div>

            {/* header */}
            <div className="text-center space-y-1.5">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {persona.name}
              </h3>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{persona.role}</p>
              <p className="text-xs text-muted-foreground">Experience: {persona.experience}</p>
            </div>

            {/* description */}
            <p className="mt-4 text-sm text-muted-foreground text-center leading-relaxed flex-1">
              {persona.description}
            </p>

            {/* traits */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center px-1">
              {persona.traits.map((t, idx) => (
                <span key={idx} className={chipClass}>
                  {t}
                </span>
              ))}
            </div>

            {/* cta */}
            <div className="mt-6">
              <Button onClick={() => onSelect(persona.id)} className="w-full h-10 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-blue-800 text-white hover:from-blue-600 hover:to-blue-900"
>
                Use Persona
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const PersonaLibrary = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState<string | undefined>();
  const [trait, setTrait] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const handleSelectPersona = (personaId: string) => {
    navigate(`/chat/${personaId}`);
  };

  const filteredPersonas = useMemo(
    () =>
      personas
        .filter((p) => (specialty ? p.role === specialty : true))
        .filter((p) => (trait ? p.traits.some((t) => t.toLowerCase() === trait.toLowerCase()) : true))
        .filter(
          (persona) =>
            persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            persona.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            persona.traits.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
            persona.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    [specialty, trait, searchTerm]
  );

  const scrollBy = (delta: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <Navbar
        specialties={specialties}
        traits={personaTraits}
        selectedSpecialty={specialty}
        selectedTrait={trait}
        onChangeSpecialty={setSpecialty}
        onChangeTrait={setTrait}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-left space-y-3 px-4">
        <h2 className="text-l md:text-4xl font-bold bg-gradient-to-r from-blue-950 via-blue-600 to-blue-200 bg-clip-text text-transparent pt-8">
          Persona Library
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">Explore a curated library of medical personas............</p>
        <h3 className="pt-3 text-2xl font-semibold text-blue-900">Hi Rajan, please select persona to continue</h3>

      </div>

      {/* Cards: responsive grid on xl, horizontal carousel on small/medium */}
      <div className="mt-10 relative max-w-6xl mx-auto px-4">
        {/* Left Arrow */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-360)}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-transparent hover:text-blue-600"
        >
          <ChevronLeft className="w-10 h-10 text-gray-600" />
        </button>

        <div
          ref={scrollerRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredPersonas.length > 0 ? (
            filteredPersonas.map((persona) => (
              <div key={persona.id} className="snap-start">
                <PersonaCard persona={persona} onSelect={handleSelectPersona} />
              </div>
            ))
          ) : (
            <div key="empty" className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No personas found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(360)}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-transparent hover:text-blue-600"
        >
          <ChevronRight className="w-10 h-10 text-blue-800" />
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-muted-foreground">
        <p className="text-lg mb-5">{filteredPersonas.length} of 110</p>
      </div>
    </div>
  );
};

export default PersonaLibrary;