export interface CreateDriver {
    last_name: string;
    first_name: string;
    ssd: string;
    dob: Date;
    address?: string;
    city?: string;
    zip?: string;
    phone: string;
}