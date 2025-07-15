import { usersActionsService } from "../services/index.service.js";


async function readUsersActions(req, res) {
    const message = "USERS FOUND";
    const response = await usersActionsService.getAll();
    return res.status(200).json({ response, message });
}

async function readUsersActionsByUserId(req, res) {
    const { id } = req.params;
    const message = "USER FOUND";
    const response = await usersActionsService.get({"userId":id});
    return res.status(200).json({ response, message });
}

async function readUsersActionsByQuotationId(req, res) {
    const { id } = req.params;
    const message = "QUOTATION FOUND";
    const response = await usersActionsService.get({"quotationModifiedId":id});
    return res.status(200).json({ response, message });
}

export { readUsersActions, readUsersActionsByUserId, readUsersActionsByQuotationId };