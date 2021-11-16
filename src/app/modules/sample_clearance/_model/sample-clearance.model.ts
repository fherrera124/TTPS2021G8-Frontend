export interface SampleClearance{
    id: number,  
    ml_extracted: number,
    freezer_number: number,
    study_id: number,
    picked_up_by: string,
    picked_up_date: string,
    sample_batch_id: number,
    paid: boolean
}
