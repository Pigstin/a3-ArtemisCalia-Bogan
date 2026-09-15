export class AppData {
    constructor() {
        this.entries = []; 
    }
    
    orderEntries() {
        let day = 1000*60*60*24
        
        // using bubblesort going by the date, 
        // and then encorporating the priority
        // to schedule an amount of days prior
        for(let i = 0; i < entries.length; i++) {
            for(let j = 0; j < entries.length - i - 1; j++) {
            if(
                new Date(entries[j].deadline - entries[j].priority * day) > 
                new Date(entries[j + 1].deadline - entries[j+1].priority * day)
            ) {
                let temp = entries[j]
                entries[j] = entries[j+1]
                entries[j+1] = temp 
            } 
            }
        } 

        for(let i = 0; i < entries.length; i++) {
            entries[i].order = i; 
        }

        return entries; 
    }
}

export class Entry {
    constructor(entryname, deadline, priority) {
        this.entry = entryname;
        this.deadline = deadline;
        this.priority = priority;
    }

}