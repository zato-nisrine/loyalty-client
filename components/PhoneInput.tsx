'use client'

import React, { useState, useEffect } from 'react'

interface Country {
  code: string
  name: string
  dialCode: string
  format: RegExp
  example: string
}

const countries: Country[] = [
  { code: 'BJ', name: 'Bénin', dialCode: '+229', format: /^(?:01)?\d{8}$/, example: '01XXXXXXXX' },
  { code: 'CI', name: "Côte d'Ivoire", dialCode: '+225', format: /^(?:0[157])?\d{8}$/, example: '01XXXXXXXX' },
  { code: 'SN', name: 'Sénégal', dialCode: '+221', format: /^7[05-8]\d{7}$/, example: '77XXXXXXXX' },
  { code: 'TG', name: 'Togo', dialCode: '+228', format: /^[79]\d{7}$/, example: '90XXXXXX' },
  { code: 'CM', name: 'Cameroun', dialCode: '+237', format: /^(?:6|2)\d{8}$/, example: '6XXXXXXXX' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', format: /^[567]\d{7}$/, example: '70XXXXXX' },
  { code: 'ML', name: 'Mali', dialCode: '+223', format: /^[5-9]\d{7}$/, example: '70XXXXXX' },
  { code: 'NE', name: 'Niger', dialCode: '+227', format: /^[789]\d{7}$/, example: '90XXXXXX' },
  { code: 'GA', name: 'Gabon', dialCode: '+241', format: /^(?:0)?[1-9]\d{6,7}$/, example: '07XXXXXX' },
  { code: 'CD', name: 'RD Congo', dialCode: '+243', format: /^(?:0)?[89]\d{8}$/, example: '08XXXXXXXX' },
  { code: 'CG', name: 'Congo', dialCode: '+242', format: /^(?:0)?[4-6]\d{7}$/, example: '06XXXXXXXX' },
  { code: 'FR', name: 'France', dialCode: '+33', format: /^(?:0)?[67]\d{8}$/, example: '06XXXXXXXX' },
  { code: 'US', name: 'États-Unis', dialCode: '+1', format: /^\d{10}$/, example: 'XXXXXXXXXX' },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onValidityChange?: (isValid: boolean) => void
  required?: boolean
  error?: string
}

export default function PhoneInput({
  value,
  onChange,
  onValidityChange,
  required = false,
  error,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [countryError, setCountryError] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  // Synchroniser la validité initiale si requis
  useEffect(() => {
    if (!phoneNumber) {
      onValidityChange?.(!required)
    } else {
      const isValid = selectedCountry.format.test(phoneNumber)
      onValidityChange?.(isValid)
    }
  }, [selectedCountry, required, onValidityChange, phoneNumber])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    setPhoneNumber(raw)

    const isValid = raw.length > 0 && selectedCountry.format.test(raw)
    onValidityChange?.(isValid)

    if (isValid) {
      setCountryError('')
    } else if (isTouched && raw.length > 0) {
      setCountryError(`Format invalide pour ${selectedCountry.name}. Exemple: ${selectedCountry.example}`)
    }

    const fullNumber = raw ? `${selectedCountry.dialCode}${raw}` : ''
    onChange(fullNumber)
  }

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country)
    setCountryError('')
    setShowDropdown(false)
    setIsTouched(false)

    if (phoneNumber) {
      const isValid = country.format.test(phoneNumber)
      onValidityChange?.(isValid)
      if (!isValid) {
        setCountryError(`Format invalide pour ${country.name}. Exemple: ${country.example}`)
      }
      onChange(`${country.dialCode}${phoneNumber}`)
    } else {
      onValidityChange?.(!required)
      onChange('')
    }
  }

  const handleBlur = () => {
    setIsTouched(true)
    if (!phoneNumber) {
      if (required) {
        setCountryError('Numéro de téléphone requis')
        onValidityChange?.(false)
      } else {
        setCountryError('')
        onValidityChange?.(true)
      }
      return
    }

    if (!selectedCountry.format.test(phoneNumber)) {
      setCountryError(`Format invalide pour ${selectedCountry.name}. Exemple: ${selectedCountry.example}`)
      onValidityChange?.(false)
    } else {
      setCountryError('')
      onValidityChange?.(true)
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
        Numéro de téléphone
      </label>
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex h-[42px] items-center gap-1.5 rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3 text-sm font-semibold text-[#243746] outline-none transition-all hover:bg-white hover:border-[#4F9DCE] focus:border-[#4F9DCE] focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
          >
            <span>{selectedCountry.dialCode}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-56 overflow-y-auto rounded-xl border border-[#D8E0E8] bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#102A43]">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    selectedCountry.code === country.code
                      ? 'bg-[#4F9DCE]/10 font-bold text-[#4F9DCE]'
                      : 'text-[#243746] hover:bg-[#F5F8FC] dark:text-white dark:hover:bg-[#173859]'
                  }`}
                >
                  <span className="font-semibold">{country.dialCode}</span>
                  <span className="ml-2 truncate text-text-muted">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          required={required}
          placeholder={selectedCountry.example}
          className={`flex-1 rounded-xl border bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:bg-white focus:ring-2 dark:bg-[#173859] dark:text-white ${
            countryError
              ? 'border-[#C43D4D] focus:border-[#C43D4D] focus:ring-[#C43D4D]/20'
              : 'border-[#D8E0E8] focus:border-[#4F9DCE] focus:ring-[#4F9DCE]/20 dark:border-white/10'
          }`}
        />
      </div>

      {countryError ? (
        <p className="text-[11px] font-medium text-[#C43D4D]">{countryError}</p>
      ) : (
        <p className="text-[11px] text-[#5B7286] dark:text-[#8FA6BA]">
          Format pour {selectedCountry.name} : {selectedCountry.example}
        </p>
      )}
    </div>
  )
}
