export default function handler(req, res) {
    const body = req.body
    console.log('Body: ', body)

    if (!body.comment) {
        return res.status(400).json({data: 'No Data'})
    }

    res.status(200).json({data: body})
}