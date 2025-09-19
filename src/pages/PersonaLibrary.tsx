import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Stethoscope, Brain, Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar"; // ✅ corrected import

interface Persona {
  id: string;
  name: string;
  role: string;
  experience: string;  
  traits: string[];
  icon: React.ComponentType<any>;
  description: string;
  rating: number;
}


const specialties = ["Oncologist", "Dermatologist", "Cardiologist"];
const personaTraits = [
  "Evidence-driven",
  "Brand loyalist",
  "Guidelines-focused",
  "Humorous",
];

const personas: Persona[] = [
  {
    id: "innovator",
    name: "Dr. Sarah Chen",
    role: "Oncologist",
    experience: "14 yrs",   // ✅ separate key
    traits: [
      "Cautious",
      "Evidence-driven switcher",
      "Brand Loyalist",
      "Sticks to few key things",
      "Warm and Approachable",
    ],
    icon: Brain,
    description:
      "Cautious oncologist, loyal to evidence and brands, approachable with focused care.",
    rating: 4.5,
  },
  {
    id: "loyalist",
    name: "Dr. Michael Torres",
    role: "Dermatologist",
    experience: "10 yrs",   // ✅ separate key
    traits: [
      "Brand loyalist",
      "Moderately evidence-aware",
      "Elaborate and Detailed",
      "Flexible in adapting new therapy areas",
      "Early Adopter",
      "Frequent Switcher",
    ],
    icon: Stethoscope,
    description:
      "Brand-loyal dermatologist, detailed yet flexible, adapts early and switches frequently.",
    rating: 4.3,
  },
  {
    id: "guide",
    name: "Dr. Emma Rodriguez",
    role: "Oncologist",
    experience: "24 yrs",   // ✅ separate key
    traits: [
      "Humorous",
      "Data-driven",
      "Reactive",
      "Referencing guidelines",
      "Engaging",
      "Diverse range of topics",
    ],
    icon: Heart,
    description:
      "Engaging oncologist, humorous and reactive, blending data with diverse guideline-based care.",
    rating: 4.6,
  },
];



const PersonaLibrary = () => {
  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState<string | undefined>();
  const [trait, setTrait] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectPersona = (personaId: string) => {
    navigate(`/chat/${personaId}`);
  };

  const filteredPersonas = personas
    .filter((p) => (specialty ? p.role === specialty : true))
    .filter((p) =>
      trait ? p.traits.some((t) => t.toLowerCase() === trait.toLowerCase()) : true
    )
    .filter(
      (persona) =>
        persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.traits.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        persona.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[var(--gradient-soft)]">
      {/* Navbar */}
      <Navbar
        specialties={specialties}
        traits={personaTraits}
        selectedSpecialty={specialty}
        selectedTrait={trait}
        onChangeSpecialty={setSpecialty}
        onChangeTrait={setTrait}
      />

      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-left space-y-3 px-4">
        <h2
          className="text-l md:text-4xl font-bold 
                    bg-gradient-to-r from-blue-950 via-blue-600 to-blue-200 
                    bg-clip-text text-transparent pt-8"
        >
          Persona Library
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Explore a curated library of medical personas............
        </p>
        <h3 className="pt-3 text-2xl font-semibold text-blue-900">
          Hi Rajan, please select persona to continue
        </h3>
      </div>


      {/* Persona Cards Grid with Arrows */}
      <div className="mt-12 relative max-w-5xl mx-auto px-4 md:px-0">
        {/* Left Arrow */}
        <button className="absolute -left-12 top-1/2 transform -translate-y-1/2 p-2">
          <ChevronLeft className="w-12 h-12 text-gray-400" />
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPersonas.length > 0 ? (
            filteredPersonas.map((persona) => {
              const IconComponent = persona.icon;
              return (
                <Card key={persona.id} className="medical-card p-0 overflow-hidden group">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {persona.name}
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          {persona.role}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Experience: {persona.experience}
                        </p>
                      </div>


                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{persona.description}</p>
                        <div className="flex flex-wrap gap-2 justify-center p-2 m-1">
                          {persona.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="text-xs bg-accent-soft text-accent-foreground px-3 py-1 rounded-full"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <Button
                        onClick={() => handleSelectPersona(persona.id)}
                        className="btn-medical w-full"
                      >
                        Use Persona
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No personas found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2">
          <ChevronRight className="w-12 h-12 text-blue-600" />
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-muted-foreground">
        <p className="text-lg mb-5">3 of 110</p>
      </div>
    </div>
  );
};

export default PersonaLibrary;
