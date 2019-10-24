module.exports =
  {
    "resourceType": "Patient",
    "id": "nl-core-patient-example-2-roos-dalstra",
    "meta": {"profile": ["http://fhir.nl/fhir/StructureDefinition/nl-core-patient"]},
    "text": {
      "status": "additional",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table><tbody><tr><td>Naam: Roos Dalstra</td><td>BSN: ?</td></tr><tr><td>Geboortedatum: 1964-03-04</td><td>Geslacht: Vrouw (Gehuwd)</td></tr><tr><td>Tel: ?<br />E-mail: ?</td><td>Adres: ?</td></tr><tr><td>Contactpersoon: Joost Dalstra (echtgenoot)</td><td>Huisarts: ?</td></tr></tbody></table></div>"
    },
    "active": true,
    "identifier": [{"use": "official", "system": "http://fhir.nl/fhir/NamingSystem/bsn", "value": "999999991"}],
    "name": [{
      "use": "usual",
      "family": "Dalstra",
      "_family": {
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/humanname-partner-name",
          "valueString": "Dalstra"
        }]
      },
      "given": ["Roos", "R."],
      "_given": [{
        "extension": [{
          "url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier",
          "valueCode": "CL"
        }]
      }, {"extension": [{"url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier", "valueCode": "IN"}]}]
    }],
    "gender": "female",
    "birthDate": "1964-03-04",
    "deceasedBoolean": false,
    "maritalStatus": {
      "coding": [{
        "system": "http://hl7.org/fhir/v3/MaritalStatus",
        "code": "M",
        "display": "Married"
      }]
    },
    "contact": [{
      "relationship": [{
        "coding": [{
          "system": "http://hl7.org/fhir/v3/RoleCode",
          "code": "HUSB",
          "display": "Husband"
        }]
      }],
      "name": {
        "use": "official",
        "family": "Dalstra",
        "_family": {
          "extension": [{
            "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-name",
            "valueString": "Dalstra"
          }]
        },
        "given": ["Joost"],
        "_given": [{
          "extension": [{
            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier",
            "valueCode": "CL"
          }]
        }]
      }
    }]
  };