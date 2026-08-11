interface project {
    id:number;
    title:string;
    description:string;
    subDescription:string[];
    href:string;
    logo:string;
    image:string;
    tags:tags[];
}

interface tags {
    id:number;
    name:string;
    path:string;
}