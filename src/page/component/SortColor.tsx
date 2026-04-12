type Props = { sort: string };

const colors: Record<string, string> = {
    Vogel: "#3eb5e8",
    Vlinder: "#8d4f92",
    Pootdier: "#aa6338",
    Struiken: "#478754",
    Amfibie: "#9f9e99",
    Plant: "#478754",
    "Evenhoevig dier": "#7d6447",
    Insect: "#5e9a84",
    Hert: "#b9a33e",
    Vleermuis: "#15110e",
    Boom: "#bbd767",
    Paddenstoel: "#79391c",
};

export default function SortColot({ sort }: Props) {
    const color = colors[sort];
    return <div style={{ backgroundColor: color }}>&nbsp;</div>;
}
