import { logger } from "../utils/logger"

export const useInputInfoController = () => {

    const initialLog = () => {
        logger.log("[InputInfo Controller] Initial log")
    };

    return {
        initialLog
    };

}