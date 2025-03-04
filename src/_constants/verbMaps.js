export const verbEndingMap = {
  PRESENT: {
    SINGULIER: {
      PREMIER: {
        ER: "e",
        IR: "is",
      },
      DEUXIEME: {
        ER: "es",
        IR: "is",
      },
      TROISIEME: {
        ER: "e",
        IR: "it",
      },
    },
    PLURIEL: {
      PREMIER: {
        ER: "ons",
        IR: "issons",
      },
      DEUXIEME: {
        ER: "ez",
        IR: "issez",
      },
      TROISIEME: {
        ER: "ent",
        IR: "issent",
      },
    },
  },
  FUTUR: {
    SINGULIER: {
      PREMIER: {
        ER: "erai",
        IR: "irai",
      },
      DEUXIEME: {
        ER: "eras",
        IR: "iras",
      },
      TROISIEME: {
        ER: "era",
        IR: "ira",
      },
    },
    PLURIEL: {
      PREMIER: {
        ER: "erons",
        IR: "irons",
      },
      DEUXIEME: {
        ER: "erez",
        IR: "irez",
      },
      TROISIEME: {
        ER: "eront",
        IR: "iront",
      },
    },
  },
  PAST_PARTICIPLE: {
    ER: "é",
    IR: "i",
  },
};
export const auxMap = {
  AUXILIAIRE_ETRE: {
    SINGULIER: {
      PREMIER: "suis",
      DEUXIEME: "es",
      TROISIEME: "est",
    },
    PLURIEL: {
      PREMIER: "sommes",
      DEUXIEME: "êtes",
      TROISIEME: "sont",
    },
  },
  AUXILIAIRE_AVOIR: {
    SINGULIER: {
      PREMIER: "ai",
      DEUXIEME: "as",
      TROISIEME: "a",
    },
    PLURIEL: {
      PREMIER: "avons",
      DEUXIEME: "avez",
      TROISIEME: "ont",
    },
  },
};

export const pronominalMap = {
  SINGULIER: {
    PREMIER: "me",
    DEUXIEME: "te",
    TROISIEME: "se",
  },
  PLURIEL: {
    PREMIER: "nous",
    DEUXIEME: "vous",
    TROISIEME: "se",
  },
};
