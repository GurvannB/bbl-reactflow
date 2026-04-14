'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Field, FieldGroup} from "@/components/ui/field";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Plus} from "lucide-react";
import {BunnyData} from "@/lib/types";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

type Props = {
    onSubmit: (data: BunnyData) => void,
    disabled: boolean,
}

const schema = z.object({
    name: z.string().min(1, "Le nom du lapin est requis."),
});

export default function AddBunnyDialog({onSubmit, disabled}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        },
        mode: "onSubmit",
    });

    function handleSubmit(data: BunnyData) {
        onSubmit(data);
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open}
                onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button variant="outline" type="button" disabled={disabled}><Plus/> Ajouter un lapin</Button>}/>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="sm:max-w-sm grid gap-4">
                    <DialogHeader>
                        <DialogTitle>Ajouter un lapin</DialogTitle>
                        <DialogDescription>
                            Entrez les informations du lapin que vous souhaitez ajouter !
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" placeholder="Pinpin..." {...form.register('name')}/>
                            {!!form.formState.errors.name && (
                                <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Annuler</Button>}/>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}