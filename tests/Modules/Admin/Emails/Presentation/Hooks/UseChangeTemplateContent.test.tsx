import { renderHook, act } from '@testing-library/react';
import UseChangeTemplateContent from "@admin/emailTemplates/Presentation/Hooks/UseChangeTemplateContent";
import MockChangeTemplateContentUseCase from "../../Application/UseCases/ChangeTemplateContent/MockChangeTemplateContentUseCase";
import { ChangeTemplateContentContext } from "@admin/emailTemplates/Presentation/Context/ChangeTemplateContentContext";
import React from 'react';
import { EmailTemplateErrors } from "@admin/emailTemplates/Domain/Errors/EmailTemplateErrors";

describe('UseChangeTemplateContent', () => {
    let mockUseCase: MockChangeTemplateContentUseCase;

    beforeEach(() => {
        mockUseCase = new MockChangeTemplateContentUseCase();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ChangeTemplateContentContext.Provider value={mockUseCase}>
            {children}
        </ChangeTemplateContentContext.Provider>
    );

    it('should initialize with default states', () => {
        const { result } = renderHook(() => UseChangeTemplateContent(), { wrapper });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should call execute and handle success', async () => {
        mockUseCase.mockExecuteSuccess();
        const { result } = renderHook(() => UseChangeTemplateContent(), { wrapper });

        await act(async () => {
            const call = await result.current.ChangeContent('template-123', 'new content');
            expect(call.isOk()).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(mockUseCase.Execute).toHaveBeenCalledWith('template-123', 'new content');
    });

    it('should handle error when execute fails', async () => {
        const expectedError = EmailTemplateErrors.TEMPLATE_NOT_FOUND;
        mockUseCase.mockExecuteFailure(expectedError);
        const { result } = renderHook(() => UseChangeTemplateContent(), { wrapper });

        await act(async () => {
            const call = await result.current.ChangeContent('template-123', 'bad content');
            expect(call.isErr()).toBe(true);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(expectedError);
    });

    it('should set loading state during execution', async () => {
        let resolvePromise: (value: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        mockUseCase.Execute.mockReturnValue(promise as any);

        const { result } = renderHook(() => UseChangeTemplateContent(), { wrapper });

        let call: any;
        act(() => {
            call = result.current.ChangeContent('id', 'content');
        });

        expect(result.current.loading).toBe(true);

        await act(async () => {
            resolvePromise!({ isOk: () => true, isErr: () => false, value: undefined });
            await call;
        });

        expect(result.current.loading).toBe(false);
    });
});
