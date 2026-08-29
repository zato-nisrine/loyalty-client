'use client'

import { useState } from 'react'

interface Country {
  code: string
  name: string
  dialCode: string
  format: RegExp
  example: string
}

const countries: Country[] = [
  { code: 'BJ', name: 'Bénin', dialCode: '+229', format: /^01\d{7}$/, example: '01XXXXXXXX' },
  { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '+225', format: /^0[17]\d{7}$/, example: '01XXXXXXXX' },
  { code: 'SN', name: 'Sénégal', dialCode: '+221', format: /^7[6-8]\d{7}$/, example: '77XXXXXXXX' },
  { code: 'TG', name: 'Togo', dialCode: '+228', format: /^9[0-9]\d{6}$/, example: '90XXXXXX' },
  { code: 'CM', name: 'Cameroun', dialCode: '+237', format: /^6[0-9]\d{7}$/, example: '67XXXXXXXX' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', format: /^7[0-9]\d{7}$/, example: '70XXXXXXXX' },
  { code: 'ML', name: 'Mali', dialCode: '+223', format: /^7[0-9]\d{7}$/, example: '70XXXXXXXX' },
  { code: 'NE', name: 'Niger', dialCode: '+227', format: /^9[0-9]\d{7}$/, example: '90XXXXXXXX' },
  { code: 'GA', name: 'Gabon', dialCode: '+241', format: /^0[1-9]\d{6}$/, example: '01XXXXXX' },
  { code: 'CD', name: 'RD Congo', dialCode: '+243', format: /^0[89]\d{8}$/, example: '09XXXXXXXX' },
  { code: 'CG', name: 'Congo', dialCode: '+242', format: /^0[4-6]\d{7}$/, example: '05XXXXXXXX' },
  { code: 'FR', name: 'France', dialCode: '+33', format: /^[67]\d{8}$/, example: '6XXXXXXXX' },
  { code: 'US', name: 'États-Unis', dialCode: '+1', format: /^\d{10}$/, example: 'XXXXXXXXXX' },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export default function PhoneInput({ value, onChange, required = false, error }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [countryError, setCountryError] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '')
    setPhoneNumber(newValue)
    setCountryError('')
    
    const fullNumber = `${selectedCountry.dialCode}${newValue}`
    onChange(fullNumber)
  }

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country)
    setPhoneNumber('')
    setCountryError('')
    setShowDropdown(false)
    onChange('')
  }

  const validatePhone = () => {
    if (!phoneNumber) {
      setCountryError('Numéro de téléphone requis')
      return false
    }
    if (!selectedCountry.format.test(phoneNumber)) {
      setCountryError(`Format invalide pour ${selectedCountry.name}. Exemple: ${selectedCountry.example}`)
      return false
    }
    setCountryError('')
    return true
  }

  return (
    <div className="space-y-1">
      <label className="text-sm text-stone-600">Téléphone</label>
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 hover:border-stone-400"
          >
            <span>{selectedCountry.dialCode}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-48 overflow-y-auto rounded-lg border border-stone-200 bg-white shadow-lg">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-stone-50"
                >
                  <span className="font-medium">{country.dialCode}</span>
                  <span className="ml-2 text-stone-600">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={validatePhone}
          required={required}
          placeholder={selectedCountry.example}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
        />
      </div>
      
      {(countryError || error) && (
        <p className="text-xs text-red-600">{countryError || error}</p>
      )}
      <p className="text-xs text-stone-400">
        Format pour {selectedCountry.name}: {selectedCountry.example}
      </p>
    </div>
  )
}
