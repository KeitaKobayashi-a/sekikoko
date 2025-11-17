import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";

export default function Seats() {
  const groups = ["A", "B", "C", "D"];

  return (
    <Box sx={{ p: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
      {groups.map((group) => (
        <Card key={group} sx={{ width: "45%", minWidth: 220 }}>
          <CardContent>
            <Typography variant="h6">{group} グループ</Typography>

            <Stack direction="row" spacing={1} mt={2}>
              <Button variant="outlined" sx={{ flex: 1 }}>{group}-1</Button>
              <Button variant="outlined" sx={{ flex: 1 }}>{group}-2</Button>
            </Stack>

            <Stack direction="row" spacing={1} mt={1}>
              <Button variant="outlined" sx={{ flex: 1 }}>{group}-3</Button>
              <Button variant="outlined" sx={{ flex: 1 }}>{group}-4</Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
