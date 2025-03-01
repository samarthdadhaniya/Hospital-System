"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Doctor } from "@/lib/types"

interface DoctorFormProps {
  onSubmit: (doctor: Doctor) => void
  onCancel: () => void
  initialData?: Doctor | null
}

export default function DoctorForm({ onSubmit, onCancel, initialData }: DoctorFormProps) {
  const [formData, setFormData] = useState<Omit<Doctor, "id">>({
    name: initialData?.name || "",
    specialty: initialData?.specialty || "",
    availability: initialData?.availability || "Available",
  })

  const [errors, setErrors] = useState({
    name: "",
    specialty: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleAvailabilityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, availability: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: formData.name ? "" : "Doctor name is required",
      specialty: formData.specialty ? "" : "Specialty is required",
    }

    setErrors(newErrors)

    // If there are errors, don't submit
    if (newErrors.name || newErrors.specialty) {
      return
    }

    // Submit the form
    onSubmit({
      id: initialData?.id || "",
      ...formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Doctor Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter doctor name" />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Input
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          placeholder="Enter specialty"
        />
        {errors.specialty && <p className="text-sm text-destructive">{errors.specialty}</p>}
      </div>

      <div className="space-y-2">
        <Label>Availability</Label>
        <RadioGroup
          defaultValue={formData.availability}
          onValueChange={handleAvailabilityChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Available" id="available" />
            <Label htmlFor="available">Available</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Not Available" id="not-available" />
            <Label htmlFor="not-available">Not Available</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Doctor</Button>
      </div>
    </form>
  )
}

