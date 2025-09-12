import { ArrowRight, Play, CheckCircle, Star, Users, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Clock,
    title: 'Sesiones de 20 minutos',
    description: 'Consultas rápidas y efectivas que se adaptan a tu horario'
  },
  {
    icon: Users,
    title: 'Expertos verificados',
    description: 'Coaches certificados en múltiples áreas de especialización'
  },
  {
    icon: Shield,
    title: 'Seguro y confiable',
    description: 'Plataforma segura con garantía de satisfacción'
  }
];

const specialties = [
  'Salud', 'Psicología', 'Derecho', 'Tecnología', 'Negocios', 
  'Arte', 'Agricultura', 'Mecánica', 'Educación'
];

const testimonials = [
  {
    name: 'María González',
    role: 'Emprendedora',
    rating: 5,
    comment: 'Increíble poder consultar con expertos de forma tan rápida y efectiva'
  },
  {
    name: 'Carlos Rivera',
    role: 'Desarrollador',
    rating: 5,
    comment: 'Los coaches de tecnología me han ayudado a resolver problemas complejos'
  }
];

export const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                  🚀 Conecta con expertos al instante
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  Coaching profesional en{' '}
                  <span className="text-secondary-light">20 minutos</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Conecta instantáneamente con coaches expertos en salud, psicología, 
                  tecnología, derecho y más. Resuelve tus dudas de forma rápida y efectiva.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                  Buscar coaches
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver cómo funciona
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-light" />
                  <span>Sin compromisos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-light" />
                  <span>Pago por sesión</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-light" />
                  <span>24/7 disponible</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in">
              <div className="aspect-video bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white mx-auto mb-4" />
                  <p className="text-white/90">Video demo de la plataforma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir 20minCoach?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Una nueva forma de acceder a coaching profesional, diseñada para tu estilo de vida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Especialidades disponibles
            </h2>
            <p className="text-xl text-muted-foreground">
              Encuentra expertos en tu área de interés
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-base px-6 py-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 italic">
                    "{testimonial.comment}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están aprovechando el poder del coaching instantáneo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Únete como coach
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};