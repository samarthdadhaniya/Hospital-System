"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Hospital } from "@/lib/types"

interface HospitalFormProps {
  onSubmit: (hospital: Hospital) => void
  onCancel: () => void
  initialData?: Hospital | null
}

export default function HospitalForm({ onSubmit, onCancel, initialData }: HospitalFormProps) {
  const [formData, setFormData] = useState<Omit<Hospital, "id">>({
    name: initialData?.name || "",
    address: initialData?.address || "",
    contactNumber: initialData?.contactNumber || "",
  })

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    contactNumber: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: formData.name ? "" : "Hospital name is required",
      address: formData.address ? "" : "Address is required",
      contactNumber: formData.contactNumber ? "" : "Contact number is required",
    }

    setErrors(newErrors)

    // If there are errors, don't submit
    if (newErrors.name || newErrors.address || newErrors.contactNumber) {
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
        <Label htmlFor="name">Hospital Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter hospital name" />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Hospital Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter hospital address"
        />
        {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Enter contact number"
        />
        {errors.contactNumber && <p className="text-sm text-destructive">{errors.contactNumber}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Hospital</Button>
      </div>
    </form>
  )
}

