import ResistanceJournal from "./ResistanceJournal";
import CardioJournal from "./CardioJournal";

interface ExerciseJournalProps {
    resistanceEntries: ExerciseEntry[];
    cardioEntries: ExerciseEntry[];
}

export default function ExerciseJournal({
    resistanceEntries,
    cardioEntries,
}: ExerciseJournalProps) {

    return (
        <section className="flex flex-col gap-4 lg:flex-row">
            <ResistanceJournal resistanceEntries={resistanceEntries} />
            <CardioJournal cardioEntries={cardioEntries} />
        </section>
    );
}
