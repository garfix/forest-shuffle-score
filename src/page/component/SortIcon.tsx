import plant from "./sorts/Plant.png";
import evenhoevige from "./sorts/Evenhoevig dier.png";
import muis from "./sorts/Muis.png";
import insect from "./sorts/Insect.png";
import boom from "./sorts/Boom.png";
import amfibie from "./sorts/Amfibie.png";
import pootdier from "./sorts/Pootdier.png";
import vogel from "./sorts/Vogel.png";
import vis from "./sorts/Vis.png";
import eekhoorn from "./sorts/Eekhoorn.png";
import vleermuis from "./sorts/Vleermuis.png";
import libel from "./sorts/Libel.png";
import struiken from "./sorts/Struiken.png";
import heide from "./sorts/Heide.png";
import hert from "./sorts/Hert.png";
import paddenstoel from "./sorts/Paddenstoel.png";
import vlinder from "./sorts/Vlinder.png";
import rivier from "./sorts/Rivier.png";
import grot from "./sorts/Grot.png";

const icons: Record<string, any> = {
    Plant: plant,
    "Evenhoevig dier": evenhoevige,
    Muis: muis,
    Insect: insect,
    Boom: boom,
    Amfibie: amfibie,
    Pootdier: pootdier,
    Vogel: vogel,
    Vis: vis,
    Eekhoorn: eekhoorn,
    Vleermuis: vleermuis,
    Libel: libel,
    Struiken: struiken,
    Heide: heide,
    Hert: hert,
    Paddenstoel: paddenstoel,
    Vlinder: vlinder,
    Rivier: rivier,
    Grot: grot,
};

export function SortIcon({ sort }: { sort: string }) {
    return <img src={icons[sort]} width="30" />;
}
