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