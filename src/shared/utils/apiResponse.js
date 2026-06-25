export const success = (
    res,

    data = null,

    message = "Success",

    statusCode = 200,

    meta = null
) => {
    const response = {
        success: true,

        message,

        data,
    };

    if (meta) {
        response.meta = meta;
    }

    return res.status(statusCode).json(response);
};

export const created = (
    res,

    data,

    message = "Created"
) => {
    return success(
        res,

        data,

        message,

        201
    );
};

export const noContent = (res) => {
    return res.status(204).send();
};
