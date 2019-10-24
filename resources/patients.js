data = {
  patients: [
    {
      id: "1",
      bsn: "999999990",
      name: {
        given: "Irma",
        family: "Jongeneel-de Haas"
      },
      gender: "female",
      birthDate: "1970-03-04",
    },
    {
      id: "2",
      bsn: "999999991",
      name: {
        given: "Roos",
        family: "Dalstra"
      },
      gender: "female",
      birthDate: "1964-03-04",
    },
    {
      id: "3",
      bsn: "999999992",
      name: {
        given: "Tim",
        family: "Weernink"
      },
      gender: "male",
      birthDate: "1986-01-29",
    }
  ]
};

module.exports = {
  patientResource: class {
    static all() {
      return data.patients;
    }

    static byId(id) {
      return this.all().find((patient) => patient.id == id)
    }

    static byBSN(bsn) {
      return this.all().find((patient) => patient.bsn == bsn)
    }
  }
};

