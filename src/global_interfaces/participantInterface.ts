export type Participant = {
  id?: number;
  name: string;
  age: number;
  ageGroup: string;
  birthDate?: string;
  gender: string;
  club: string;

  results: Result[];
  disciplines: Discipline[];


  [key: string]: any;
};

export type Result = {
  id?: number;
  date: string;
  result: string;
  resultValue: number;
  resultType: string;
  discipline: Discipline;
};

export type Discipline = {
  
  name: string;
  resultType?: string;
};

export type ListParticipant = {
  id?: number;
  name: string;
  age: number;
  ageGroup: string;
  birthDate?: string;
  gender: string;
  club: string;
  disciplines: Discipline[];
};

export type DetailedParticipant = {
  id?: number;
  name: string;
  age: number;
  ageGroup: string;
  birthDate?: string;
  gender: string;
  club: string;
  disciplines: Discipline[];
  results: Result[];
};

export type ResultListItem = {
  id: number;
  date: string;
  discipline: Discipline;
  participant: ListParticipant;
  result: string;
  resultValue: number;
  resultType: string;
};