import axios, { AxiosResponse } from "axios";
import {CreateProduct, BulkCreateFullFlashCard, CheckExistAccount, CreateFTag, CreateFullFlashCard, CreateFullPracticeFromTest, CreateFullQuiz, CreateFullTest, CreateTag, CreateTestFromQuizIds, EmailResetPassword, FetchingType, GetRecord, InitRecord, LangVersion, LoginPayload, RecordFetchingType, RefreshToken, RemarkWriting, ResendOTPPayload, SearchPayload, SignUpPayload, Skill, UpdateAccountPayload, UpdateAvatarPayload, UpdateFTag, UpdateFullFlashCard, UpdateFullQuiz, UpdateFullRecord, UpdateFullTest, UpdateQuiz, UpdateRecord, UpdateRecordConfig, UpdateTag, VerifyOtpForResetPasswordPayload, VerifyOtpPayload, UpdateProductpayload } from "./interfaces";
import { UUID } from "crypto";

export class AuthOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/v1';
    }

    public async signup(payload: SignUpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/user/register`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async login(payload: LoginPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/user/login`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error logging in: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtp(payload: VerifyOtpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    
    public async resendOTP(payload: ResendOTPPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/resend?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async refreshToken() {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/token/refresh?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error logging in: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class AccountOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/v1/accounts';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async search(payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async findOne(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/search/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateAccountPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async updateAvatar(id: UUID, payload: UpdateAvatarPayload, token: string) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.avatar);

			const response: AxiosResponse = await axios.put(`${this.baseUrl}/avatar/update/${id}?${this.langQuery}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // will return image url in data
    async getAvatar(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/avatar/get/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error getting avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // get total amount number of accounts
    async count(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/count?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async getAuthenticatedInfo(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async resetPassword(email: EmailResetPassword) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/password/reset?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async checkExist(email: CheckExistAccount) {
        try {      
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/check?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error.message);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtpForResetPassword(payload: VerifyOtpForResetPasswordPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class ProductOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'http://localhost:8000/api/products';
        this.langQuery = `lang=${LangVersion.vi}`;
    }
    async create(payload: CreateProduct) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {
                validateStatus: status => status >= 200 && status <= 500
			});
			return response.data;
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return error;
		}
    }

    //get all quizzes
    async search(by:string, id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}?page=1&limit=10000`);
			
			return {
                data: response,
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return error;
		}
    }
    async searchelt(keyword:string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/etl-product-search?keyword=${keyword}`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getCostHistory( id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}/cost-history`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getPriceHistory( id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}/price-history`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getInventory( id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}/inventory`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getStats( id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}/stats`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getPurchaseStats( id: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}/purchase-stats`);
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async update(payload: UpdateProductpayload) {
        try {       
			const response: AxiosResponse = await axios.patch(`${this.baseUrl}`, payload, {
                validateStatus: status => status >= 200 && status <= 500,
			});
		
			return response
	
		} catch (error: any) {
			console.error("Request that caused the error: ", error?.request);
            return error
		} 
    }

    async delete(id: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
                validateStatus: status => status >= 200 && status <= 500,
			});
			
			return  response;
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return error;
		}
    }

    async count(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/count?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

