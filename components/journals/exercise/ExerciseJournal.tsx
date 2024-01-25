import ResistanceJournal from "./ResistanceJournal";
import CardioJournal from "./CardioJournal";

interface ExerciseJournalProps {
    resistanceEntries: ExerciseEntry[];
    cardioEntries: ExerciseEntry[];
    date: string | Date;
}

export default function ExerciseJournal({
    resistanceEntries,
    cardioEntries,
    date,
}: ExerciseJournalProps) {
    return (
        <section className="flex flex-col gap-4 lg:flex-row">
            <ResistanceJournal
                resistanceEntries={resistanceEntries}
                date={date}
            />
            <CardioJournal cardioEntries={cardioEntries} date={date} />
        </section>
    );
}
