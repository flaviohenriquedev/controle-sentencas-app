import {AutocompleteInterface, InputInterface, SelectInterface} from "@/interface/tags";
import {EntidadePadrao} from "@/class/EntidadePadrao";

export type CamposFormulario<T extends EntidadePadrao> = {
    input?: InputInterface
    autocomplete?: AutocompleteInterface
    select?: SelectInterface<T>
}

export type GrupoCampoFormulario<T extends EntidadePadrao> = {
    group: CamposFormulario<T>[]
}

