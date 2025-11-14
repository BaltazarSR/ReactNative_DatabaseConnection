import { logger } from "../utils/logger"

export const useInfoListController = () => {

    const initialLog = () => {
        logger.log("[InfoList Controller] Initial log")
    };

    return {
        initialLog
    };

}