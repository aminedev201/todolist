import { Box, Button, Card, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function Task({ taskInfo ,openDeleteDialog ,openUpdateDialog,handleChangeTaskStatus}) {
  if (!taskInfo) return null;

  return (
    <>
      <Card
        sx={{
          mb: 2,
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          alignItems: { xs: "stretch", sm: "flex-start" }, // Align to top for long text
          gap: 2,
          bgcolor: "primary.main",
          boxShadow: 4,
          borderRadius: 2,
          minHeight: { xs: "auto", sm: 80 },
          transition: "padding 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            py: { xs: 2, sm: 4 },
            paddingTop: { xs: 2, sm: 4 },
            boxShadow: 6,
          },
          // Responsive layout changes
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          flex={1}
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            textDecoration: taskInfo?.isDone ? "line-through" : "none",
            // Responsive text alignment
            textAlign: { xs: "center", sm: "left" },
            mb: { xs: 2, sm: 0 },
            // Better text handling for long content
            wordWrap: "break-word",
            overflowWrap: "break-word",
            hyphens: "auto",
            maxWidth: "100%",
            lineHeight: 1.3,
            // Responsive font size
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            // Limit text height and add scrolling for very long text
            maxHeight: { xs: "none", sm: "120px" },
            overflow: { xs: "visible", sm: "auto" },
            pr: { xs: 0, sm: 1 }, // Add padding for scrollbar
          }}
        >
          {taskInfo.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" }, // Align buttons to top for long text
            gap: { xs: 1, sm: 1 },
            width: { xs: "100%", sm: "auto" },
            flexShrink: 0, // Prevent buttons from shrinking
            pt: { xs: 0, sm: 0.5 }, // Small top padding to align with text
          }}
        >
          <Button
            onClick={() => openDeleteDialog(taskInfo)}
            sx={{
              minWidth: 0,
              width: { xs: 36, sm: 40 }, // Slightly smaller on mobile
              height: { xs: 36, sm: 40 },
              borderRadius: "50%",
              bgcolor: "white",
              color: "red",
              border: "1px solid red",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
          </Button>

          <Button
            onClick={() => openUpdateDialog(taskInfo)}
            sx={{
              minWidth: 0,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: "50%",
              bgcolor: "white",
              color: "blue",
              border: "1px solid blue",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            <EditIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
          </Button>

          <Button
            onClick={() => handleChangeTaskStatus(taskInfo)}
            sx={{
              minWidth: 0,
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: "50%",
              bgcolor: "white",
              color: taskInfo.isDone ? "orange" : "green",
              border: taskInfo.isDone
                ? "1px solid orange"
                : "1px solid green",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "grey.200",
                boxShadow: 4,
              },
            }}
          >
            {taskInfo.isDone ?
              <RemoveCircleIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} /> :
              <DoneIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
            }
          </Button>
        </Box>
      </Card>
    </>
  );
}