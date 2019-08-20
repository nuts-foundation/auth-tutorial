module.exports =
  {
    "resourceType": "Patient",
    "id": "nl-core-patient-example-1",
    "meta": {
      "versionId": "15",
      "lastUpdated": "2017-01-23T13:51:41.677+00:00",
      "profile": ["http://fhir.nl/fhir/StructureDefinition/nl-core-patient"]
    },
    "text": {
      "status": "additional",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><div><p>BSN: 123456782</p><p>Naam: Irma Jongeneel-de Haas</p><p>Geslacht: Vrouw</p><p>Geboortedatum: 1970-03-04</p><p>Telefoon: 030-2345456</p><p>E-mail: user@home.nl</p><p>Adres: Straatweg 12bII, 1000AA Amsterdam</p><p>Burgerlijke staat: gehuwd</p><p>Eerste relatie/contactpersoon is haar man Gerard Eckdom via telefoonnummer 015-23456789</p><p>Huisarts: Huisartsenpraktijk Van Eijk</p></div></div>"
    },
    "identifier": [{"use": "official", "system": "http://fhir.nl/fhir/NamingSystem/bsn", "value": "123456782"}],
    "active": true,
    "name": [{
      "extension": [{"url": "http://hl7.org/fhir/StructureDefinition/humanname-assembly-order", "valueCode": "NL4"}],
      "use": "official",
      "family": "Jongeneel-de Haas",
      "_family": {
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-name",
          "valueString": "Jongeneel"
        }, {
          "url": "http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix",
          "valueString": "de"
        }, {"url": "http://hl7.org/fhir/StructureDefinition/humanname-partner-name", "valueString": "Haas"}]
      },
      "given": ["Irma", "I."],
      "_given": [{
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier",
          "valueCode": "CL"
        }]
      }, {"extension": [{"url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier", "valueCode": "IN"}]}]
    }],
    "telecom": [{"system": "phone", "value": "030-23454567", "use": "home"}, {
      "system": "email",
      "value": "user@home.nl",
      "use": "home"
    }],
    "gender": "female",
    "birthDate": "1970-03-04",
    "deceasedBoolean": false,
    "address": [{
      "extension": [{
        "url": "http://fhir.nl/fhir/StructureDefinition/nl-core-address-official",
        "valueBoolean": true
      }],
      "use": "home",
      "type": "both",
      "line": ["Straatweg 12bII"],
      "_line": [{
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName",
          "valueString": "Straatweg"
        }, {
          "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
          "valueString": "12"
        }, {"url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-buildingNumberSuffix", "valueString": "bII"}]
      }],
      "city": "Amsterdam",
      "district": "Amsterdam",
      "postalCode": "1200AA",
      "country": "NLD"
    }],
    "maritalStatus": {
      "coding": [{
        "system": "http://hl7.org/fhir/v3/MaritalStatus",
        "code": "M",
        "display": "Married"
      }]
    },
    "multipleBirthBoolean": false,
    "contact": [{
      "relationship": [{
        "coding": [{
          "system": "urn:oid:2.16.840.1.113883.2.4.3.11.22.472",
          "code": "1",
          "display": "Eerste relatie/contactpersoon"
        }]
      }, {"coding": [{"system": "http://hl7.org/fhir/v3/RoleCode", "code": "HUSB", "display": "Husband"}]}],
      "name": {"use": "official", "family": "Eckdom", "given": ["Gerard"]},
      "telecom": [{"system": "phone", "value": "015-23456789", "use": "home"}]
    }],
    "generalPractitioner": [{"reference": "Organization/1", "display": "Huisartsenpraktijk Van Eijk"}]
  }
;