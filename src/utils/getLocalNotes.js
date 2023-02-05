export const getLocalNotes = () => {
    try {
        return JSON.parse(localStorage.getItem("af9s0n0a9fsn_notas")) ?? [];
    } catch (error) {
        
    }
    return [];
}
