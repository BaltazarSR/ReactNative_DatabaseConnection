import { logger } from "../utils/logger"
import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Alert } from "react-native";

export const useInputInfoController = () => {

    const [name, setName] = useState('');
    const [schoolID, setSchoolID] = useState('');
    const [semester, setSemester] = useState('');

    const validateInputs = () => {
        // Check if fields are empty
        if (!name.trim()) {
            logger.info("[InputInfo Controller] Name is required");
            Alert.alert("Validation Error", "Name is required");
            return { valid: false, message: "Name is required" };
        }

        if (!schoolID.trim()) {
            logger.info("[InputInfo Controller] School ID is required");
            Alert.alert("Validation Error", "School ID is required");
            return { valid: false, message: "School ID is required" };
        }

        if (!semester.trim()) {
            logger.info("[InputInfo Controller] Semester is required");
            Alert.alert("Validation Error", "Semester is required");
            return { valid: false, message: "Semester is required" };
        }

        // Validate name (at least 2 characters, only letters and spaces)
        if (name.trim().length < 2) {
            logger.info("[InputInfo Controller] Name must be at least 2 characters");
            Alert.alert("Validation Error", "Name must be at least 2 characters");
            return { valid: false, message: "Name must be at least 2 characters" };
        }

        // Validate school ID format (A followed by 8 digits)
        const schoolIDRegex = /^A\d{8}$/;
        if (!schoolIDRegex.test(schoolID.trim())) {
            logger.info("[InputInfo Controller] School ID must be in format A01234567");
            Alert.alert("Validation Error", "School ID must be in format A01234567 (A followed by 8 digits)");
            return { valid: false, message: "School ID must be in format A01234567" };
        }

        // Validate semester (must be a positive number)
        const semesterNum = parseInt(semester);
        if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 20) {
            logger.info("[InputInfo Controller] Semester must be between 1 and 20");
            Alert.alert("Validation Error", "Semester must be a number between 1 and 20");
            return { valid: false, message: "Semester must be a number between 1 and 20" };
        }

        return { valid: true };
    };

    const handleSubmit = async (maxRetries = 3) => {
        logger.log("[InputInfo Controller] Saving info...")

        const validation = validateInputs();
        if (!validation.valid) {
            return { success: false, error: validation.message };
        }

        let retryCount = 0;
        
        while (retryCount < maxRetries) {
            try {
                const { data, error } = await supabase
                    .from('students')
                    .insert([
                        {
                            name: name.trim(),
                            school_id: schoolID.trim().toUpperCase(),
                            semester: parseInt(semester)
                        }
                    ]);

                if (error) throw new Error(error.message);

                logger.log("[InputInfo Controller] Data saved successfully!");
                Alert.alert("Success", "Student information saved successfully!", [
                    {
                        text: "OK",
                    }
                ]);
                
                setName('');
                setSchoolID('');
                setSemester('');
                
                return { success: true, data };
                
            } catch (error) {
                retryCount++;
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                logger.error(`[InputInfo Controller] Error (attempt ${retryCount}/${maxRetries}):`, errorMessage);
                
                if (retryCount >= maxRetries) {
                    Alert.alert("Error", `Failed after ${maxRetries} attempts: ${errorMessage}`);
                    return { success: false, error: errorMessage };
                }
                
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
        }
        
        return { success: false, error: "Max retries reached" };
    }

    return {
        name,
        schoolID,
        semester,
        setName,
        setSchoolID,
        setSemester,
        handleSubmit
    };

}