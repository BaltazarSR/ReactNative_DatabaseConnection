import { useState, useEffect } from "react";
import { logger } from "../utils/logger";
import { supabase } from "../services/supabaseClient";
import { Student } from "../models/StudentModel";

export const useInfoListController = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>()
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError(null);
            logger.log("[InfoList Controller] Fetching students from database");
            
            const { data, error } = await supabase
                .from('students')
                .select('*');

            if (error) {
                logger.error("[InfoList Controller] Error fetching students:", error);
                setError(error.message);
                setIsConnected(false);
                return;
            }

            logger.log("[InfoList Controller] Students fetched successfully:", data?.length || 0);
            setStudents(data || []);
            setLastUpdatedAt(new Date());
            setIsConnected(true);
        } catch (err) {
            logger.error("[InfoList Controller] Unexpected error:", err);
            setError("An unexpected error occurred");
            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    };

    const checkConnection = async () => {
        try {
            logger.log("[InfoList Controller] Checking database connection");
            const { error } = await supabase
                .from('students')
                .select('id')
                .limit(1);
            
            if (error) {
                logger.error("[InfoList Controller] Connection check failed:", error);
                setIsConnected(false);
            } else {
                logger.log("[InfoList Controller] Connection check successful");
                setIsConnected(true);
            }
        } catch (err) {
            logger.error("[InfoList Controller] Connection check error:", err);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        fetchStudents();

        logger.log("[InfoList Controller] Setting up periodic connection check");
        const connectionCheckInterval = setInterval(() => {
            checkConnection();
        }, 60000);

        // Subscribe to real-time changes
        logger.log("[InfoList Controller] Setting up real-time subscription");
        
        const channel = supabase
            .channel('students-channel')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all events: INSERT, UPDATE, DELETE
                    schema: 'public',
                    table: 'students'
                },
                (payload) => {
                    logger.log("[InfoList Controller] Real-time event received:", payload.eventType);
                    
                    if (payload.eventType === 'INSERT') {
                        logger.log("[InfoList Controller] New student added");
                        setStudents((current) => {
                            const newStudent = payload.new as Student;
                            const updated = [...current, newStudent];
                            return updated;
                        });
                        setLastUpdatedAt(new Date());
                    } else if (payload.eventType === 'UPDATE') {
                        logger.log("[InfoList Controller] Student updated");
                        setStudents((current) =>
                            current.map((student) =>
                                student.id === (payload.new as Student).id
                                    ? (payload.new as Student)
                                    : student
                            )
                        );
                        setLastUpdatedAt(new Date());
                    } else if (payload.eventType === 'DELETE') {
                        logger.log("[InfoList Controller] Student deleted");
                        setStudents((current) =>
                            current.filter((student) => student.id !== (payload.old as Student).id)
                        );
                        setLastUpdatedAt(new Date());
                    }
                }
            )
            .subscribe();

        return () => {
            logger.log("[InfoList Controller] Cleaning up connection check and real-time subscription");
            clearInterval(connectionCheckInterval);
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        students,
        loading,
        error,
        fetchStudents,
        lastUpdatedAt,
        isConnected
    };
}