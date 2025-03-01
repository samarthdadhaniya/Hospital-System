"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Patient } from "@/lib/types";
import { AlertTriangle, Ambulance, CalendarRange, Dna, HeartPulse, Hospital, Loader2, Mail, MapPin, Phone, Ruler, User, Weight } from "lucide-react";
import { getPatients } from "@/lib/firebaseapi";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        // Fetch patients data from Firestore
        const loadedPatients = await getPatients(); // <-- Make sure to await this
        console.log(loadedPatients);

        setPatients(loadedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">
            Loading patients data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Patients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardHeader className="bg-primary/5 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      ID: {patient.id}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <HeartPulse className="h-3.5 w-3.5" /> Blood type
                </div>
                <p className="font-medium text-sm">{patient.bloodType}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Hospital className="h-3.5 w-3.5" /> Chronic Diseases
                </div>
                <p className="font-medium text-sm">{patient.chronicDiseases}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CalendarRange className="h-3.5 w-3.5" /> Application Date
                </div>
                <p className="font-medium text-sm">{patient.date}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <CalendarRange className="h-3.5 w-3.5" /> Date of Birth
                </div>
                <p className="font-medium text-sm">{patient.dob}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Mail className="h-3.5 w-3.5" /> Email
                </div>
                <p className="font-medium text-sm">{patient.email}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Dna className="h-3.5 w-3.5" /> Gender
                </div>
                <p className="font-medium text-sm">{patient.gender}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Ruler className="h-3.5 w-3.5" /> Height
                </div>
                <p className="font-medium text-sm">{patient.height}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Weight className="h-3.5 w-3.5" /> Weight
                </div>
                <p className="font-medium text-sm">{patient.weight}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Phone className="h-3.5 w-3.5" /> Emergency Contact
                </div>
                <p className="font-medium text-sm">{patient.phoneNumber}</p>
              </div>
              

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
