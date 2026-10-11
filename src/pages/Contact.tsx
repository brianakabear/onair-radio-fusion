import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsOptIn: false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      message: formData.message.trim(),
      sms_opt_in: formData.smsOptIn,
    });
    if (error) {
      toast({ title: "Couldn't send your message", description: "Please try again in a moment.", variant: "destructive" });
      return;
    }
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Majestic Fyah Radio. We'll get back to you soon!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      smsOptIn: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-caribbean">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to advertise with Majestic Fyah Radio? Get in touch for our media kit and advertising opportunities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover:shadow-caribbean transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-caribbean bg-clip-text text-transparent">
                  Get In Touch
                </CardTitle>
                <p className="text-muted-foreground">
                  Contact us for media kit requests, advertising opportunities, or general inquiries about Majestic Fyah Radio.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your advertising needs or inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="sms-opt-in"
                      checked={formData.smsOptIn}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, smsOptIn: !!checked }))
                      }
                    />
                    <Label htmlFor="sms-opt-in" className="text-sm leading-relaxed">
                      By checking this box, I agree to receive SMS messages about Marketing and transactional messages from 
                      Majestic Fyah Radio at the phone number provided above. The SMS frequency may vary. Data rates may apply. 
                      Text HELP to 212-962-4526 for assistance. Reply STOP to opt out of receiving SMS messages.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-caribbean"
                    size="lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="https://policies.google.com/terms" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Business Hours */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@majesticfyahllc.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (347) 345-6405</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        Majestic Fyah Radio Studios<br />
                        Broadcasting Worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay connected with Majestic Fyah Radio on social media for the latest updates, music, and events.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-4 w-4" />
                      <span>YouTube</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-primary font-medium">
                      🔴 Radio Broadcasting: 24/7 Live
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-caribbean text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Media Kit Available</h3>
                  <p className="text-white/90 mb-4">
                    Interested in advertising with Majestic Fyah Radio? Request our comprehensive media kit 
                    with audience demographics, advertising packages, and partnership opportunities.
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Audience reach and demographics</li>
                    <li>• Advertising rate cards</li>
                    <li>• Sponsorship opportunities</li>
                    <li>• Custom partnership packages</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-3">How can I advertise on Majestic Fyah Radio?</h3>
              <p className="text-muted-foreground">
                Contact us using the form above to request our media kit. We offer various advertising 
                packages including sponsored segments, commercial spots, and event partnerships.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Do you accept music submissions?</h3>
              <p className="text-muted-foreground">
                Yes! We're always looking for great Caribbean and urban music. Send your submissions 
                to our music director through the contact form.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Can I request a song or shout out?</h3>
              <p className="text-muted-foreground">
                Absolutely! Use the contact form or call during live shows. Our DJs love connecting 
                with listeners and taking requests.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Do you offer live remote broadcasts?</h3>
              <p className="text-muted-foreground">
                Yes, we provide live remote broadcasting services for events, grand openings, 
                and special occasions. Contact us for availability and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;