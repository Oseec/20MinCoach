import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, DollarSign, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { CoachCard } from '@/components/coach/CoachCard';

const mockCoaches = [
  {
    id: '1',
    userId: '1',
    bio: 'Especialista en desarrollo personal con más de 8 años de experiencia ayudando a personas a alcanzar sus objetivos. Me enfoco en técnicas de mindfulness y coaching ontológico.',
    headline: 'Coach de Desarrollo Personal y Liderazgo',
    specialties: [
      { id: '1', name: 'Desarrollo Personal', category: 'PSYCHOLOGY' },
      { id: '2', name: 'Liderazgo', category: 'BUSINESS' },
      { id: '3', name: 'Mindfulness', category: 'PSYCHOLOGY' }
    ],
    experience: 8,
    rating: 4.9,
    totalSessions: 156,
    pricePerSession: 45,
    isVerified: true,
    isOnline: true
  },
  {
    id: '2',
    userId: '2',
    bio: 'Desarrollador Full Stack con 10 años de experiencia en React, Node.js y arquitecturas cloud. Ayudo a resolver problemas técnicos complejos.',
    headline: 'Desarrollador Full Stack & Arquitecto de Software',
    specialties: [
      { id: '4', name: 'React', category: 'TECHNOLOGY' },
      { id: '5', name: 'Node.js', category: 'TECHNOLOGY' },
      { id: '6', name: 'AWS', category: 'TECHNOLOGY' }
    ],
    experience: 10,
    rating: 4.8,
    totalSessions: 89,
    pricePerSession: 60,
    isVerified: true,
    isOnline: false
  },
  {
    id: '3',
    userId: '3',
    bio: 'Psicóloga clínica especializada en terapia cognitivo-conductual y manejo del estrés. Más de 12 años ayudando a personas a superar desafíos emocionales.',
    headline: 'Psicóloga Clínica - Terapia TCC',
    specialties: [
      { id: '7', name: 'Terapia TCC', category: 'PSYCHOLOGY' },
      { id: '8', name: 'Manejo del Estrés', category: 'PSYCHOLOGY' },
      { id: '9', name: 'Ansiedad', category: 'PSYCHOLOGY' }
    ],
    experience: 12,
    rating: 4.95,
    totalSessions: 234,
    pricePerSession: 50,
    isVerified: true,
    isOnline: true
  }
];

const mockUsers = [
  { firstName: 'Dr. Carlos', lastName: 'Mendoza', profilePictureUrl: undefined },
  { firstName: 'Laura', lastName: 'Silva', profilePictureUrl: undefined },
  { firstName: 'Dra. Ana', lastName: 'Ruiz', profilePictureUrl: undefined }
];

const specialtyOptions = [
  'Desarrollo Personal', 'Liderazgo', 'Mindfulness', 'React', 'Node.js', 
  'AWS', 'Terapia TCC', 'Manejo del Estrés', 'Ansiedad', 'Salud', 
  'Negocios', 'Derecho', 'Arte'
];

export const CoachSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  // Añadir funcionalidad al panel de filtros
  const [filteredCoaches, setFilteredCoaches] = useState(mockCoaches);

  useEffect(() => {
    let results = mockCoaches;

    /* Búsqueda por texto (nombre, bio, headline, especialidades)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (coach) =>
          coach.headline.toLowerCase().includes(query) ||
          coach.bio.toLowerCase().includes(query) ||
          coach.specialties.some((s) => s.name.toLowerCase().includes(query))
      );
    }
    */

    // 🎯 Filtro por especialidades
    if (selectedSpecialties.length > 0) {
      results = results.filter((coach) =>
        coach.specialties.some((s) => selectedSpecialties.includes(s.name))
      );
    }

    /* 💵 Filtro por rango de precio
    results = results.filter(
      (coach) => coach.price >= priceRange[0] && coach.price <= priceRange[1]
    );
    */

    // ⭐ Filtro por calificación
    results = results.filter((coach) => coach.rating >= minRating);

    // 🟢 Filtro por disponibilidad online
    if (showOnlineOnly) {
      results = results.filter((coach) => coach.isOnline === true);
    }

    setFilteredCoaches(results);
  }, [searchQuery, selectedSpecialties, priceRange, minRating, showOnlineOnly]);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Buscar Coaches</h1>
        <p className="text-muted-foreground text-lg">
          Encuentra el experto perfecto para tus necesidades
        </p>
      </div>

      {/* Search Bar */}
      <Card className="border shadow-soft">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por especialidad, nombre o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Filtros de búsqueda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Specialties */}
            <div>
              <h3 className="font-semibold mb-3">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => toggleSpecialty(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Rango de precio: ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Calificación mínima: {minRating} estrellas
              </h3>
              <Slider
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Online Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="online-only"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="online-only" className="text-sm font-medium">
                Solo mostrar coaches en línea
              </label>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedSpecialties([]);
                  setPriceRange([0, 100]);
                  setMinRating(0);
                  setShowOnlineOnly(false);
                }}
              >
                Limpiar filtros
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Aplicar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {mockCoaches.length} coaches encontrados
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <Button variant="outline" size="sm">Relevancia</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredCoaches.map((coach, index) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              user={mockUsers[index]}
              onBookSession={(id) => console.log('Book session with:', id)}
              onViewProfile={(id) => console.log('View profile:', id)}
            />
          ))}
        </div>


        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Cargar más coaches
          </Button>
        </div>
      </div>
    </div>
  );
};